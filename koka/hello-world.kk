// A generator effect with one operation
effect yield<a>
  fun yield( x : a ) : ()

// Traverse a list and yield the elements
fun traverse( xs : list<a> ) : yield<a> ()
  match xs
    Cons(x,xx) -> { yield(x); traverse(xx) }
    Nil        -> ()

fun main() : console ()
  with fun yield(i : char)
    println("yielded " ++ i.show)
  "Hello, World!".list.traverse
