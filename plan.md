# Deck Plan

> first notes

1. Node.js
   1. Why I present node?
     - buzz? 
     - see packages numbers
     - javascript everywhere
   2. What's node?
     - The hidden son of Google and Netscape
   3. History
     - 2008: Ryan Dahl needed a new way to build web app, with 2 priorities: scalability and simplicity.
     - Netscape -> JS -> JavaScript the good parts
     - Gmail -> Chome -> V8
     - Non blocking I/O for scalability
     - JS for simplicity
    4. Why JS?
     - Functionnal language : callbacks, event loop and event driven programming feets well the "everything must be non blocking" approach
     - Interpreted language : simple to use and to extend
     - JS becomes popular
    5. Architecture
      - Only one process (no threads, etc.) 
      - No blocking I/O: the unique process share the memory and can run something else by waiting the end of the I/O
      - Event driven model (main loop, then event execution sequentially)
      - CommonJs
      - Provides only core APIs to manage file system, network, etc. nothing superfluous (Batteries NOT included)
      - Unix based
2. NPM
3. Grunt
4. Demo
