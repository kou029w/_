import ADS1X15 from "@chirimen/ads1x15";
import { requestI2CAccess } from "node-web-i2c";

async function readDataFromSensor(duration = 10000) {
  const i2cAccess = await requestI2CAccess();
  const ads1x15 = new ADS1X15(i2cAccess.ports.get(1), 0x48);
  await ads1x15.init(true);

  const values = [];
  const start = Date.now();

  while (Date.now() - start <= duration) {
    const output = await ads1x15.read(0);
    values.push(output);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return values;
}

/**
 * 移動平均除去AC成分を計算
 * @param values 入力値配列
 * @param windowSize 窓サイズ
 * @returns AC成分の配列
 */
function calculateAcValues(values, windowSize) {
  const acValues = [];

  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - Math.floor(windowSize / 2));
    const end = Math.min(values.length, i + Math.floor(windowSize / 2) + 1);
    const sum = values.slice(start, end).reduce((acc, val) => acc + val, 0);
    const average = sum / (end - start);

    acValues.push(values[i] - average);
  }

  return acValues;
}

/**
 * ピーク検出
 * @param values AC成分配列
 * @param minDistance 最小ピーク間隔
 * @returns ピークのインデックス配列
 */
function detectPeaks(values, minDistance) {
  const peaks = [];

  for (let i = 1; i < values.length - 1; i++) {
    if (
      values[i] > values[i - 1] &&
      values[i] > values[i + 1] &&
      values[i] > 0
    ) {
      if (peaks.length === 0 || i - peaks[peaks.length - 1] >= minDistance) {
        peaks.push(i);
      }
    }
  }

  return peaks;
}

/**
 * 脈拍検出
 */
function detectHeartRate(values, samplingRate) {
  const minBPM = (2 * samplingRate * 60) / values.length;
  const maxBPM = 120;
  const windowSize = Math.round(samplingRate * 1); // 1秒の窓サイズ
  const minDistance = Math.round(samplingRate * 0.5); // 0.5秒の最小間隔

  const acValues = calculateAcValues(values, windowSize);
  const peaks = detectPeaks(acValues, minDistance);

  if (peaks.length < 2) {
    return null;
  }

  const intervals = [];
  for (let i = 1; i < peaks.length; i++) {
    intervals.push(peaks[i] - peaks[i - 1]);
  }

  const averageInterval =
    intervals.reduce((acc, val) => acc + val, 0) / intervals.length;
  const heartRate = Math.round((samplingRate * 60) / averageInterval);

  if (minBPM <= heartRate && heartRate <= maxBPM) {
    return heartRate;
  } else {
    console.log(
      `Heart rate ${heartRate} BPM is outside valid range (${minBPM.toFixed(
        1,
      )}-${maxBPM})`,
    );
    return null;
  }
}

console.log("Starting heart rate monitoring...");

while (true) {
  console.log(`\n--- ${new Date().toLocaleTimeString()} ---`);

  try {
    const values = await readDataFromSensor(10000);
    const samplingRate = values.length / 10;
    console.log(`Data points: ${values.length}`);
    console.log(`Sampling rate: ${samplingRate} Hz`);
    console.log(`Data range: ${Math.min(...values)} - ${Math.max(...values)}`);

    const heartRate = detectHeartRate(values, samplingRate);
    console.log(
      `Detected Heart Rate: ${
        heartRate !== null ? heartRate + " BPM" : "Not detected"
      }`,
    );
  } catch (error) {
    console.error("Error reading sensor data:", error);
    console.log("Falling back to file data...");
  }
}
