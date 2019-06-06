export default {
  name: 'application',
  data() {
    return {
      input: '/**\n\n  Latest updates:\n\n  - Included support for math.js (https://mathjs.org/)\n      e.g math.cross([0, 1, 0], [1, 0, 0])\n\n  - Included support for execution performance tracking\n\n\**/\n\n// Write your code here...\nconst message = \'Hello World\';\nconsole.log(message);',
      output: [],
      preserve: true,
      execution: 0
    }
  },
  computed: {
    options() {
      return {
        lineNumbers: true,
        theme: 'material',
        mode: 'text/javascript',
        extraKeys: {
          'Ctrl-Enter': () => {
            // Execute the code from the input
            this.execute();
          },
          'Ctrl-L': () => {
            this.clear();
          }
        }
      }
    }
  },
  methods: {
    execute() {
      try {

        // Start tracking the performance
        performance.mark('execution-start');

        // Execute the code from the input, and parse all console.log to use the log function
        eval(this.input.replace(/console\.log\(/g, 'this.log(\'standard\', ').replace(/console\.(.*)\(/g, 'this.log(\'$1\', '));

        // Finish tracking the performance
        performance.mark('execution-finish');

        // Handle errors if the timing has been cleared
        try { 

          // Measure the execution time 
          performance.measure('execution', 'execution-start', 'execution-finish'); 

        } catch (e) {}

        // Save the performance time to the data (if possible)
        this.execution = (performance.getEntriesByName('execution').length > 0) ? performance.getEntriesByName('execution')[0].duration : 0;

        // Log the performance time to the console
        // this.log('performance', `\nCompleted execution in ${performance.getEntriesByName('execution')[0].duration} seconds\n`);

        // Clear the performance entries
        performance.clearMarks();
        performance.clearMeasures();

      } catch (error) {
        // Log any errors to the console
        this.log('error', error);
      }
    },
    clear() {
      this.output = [];
    },
    log(level, ...messages) {
      for (let message of messages) {
        // Parse any error messages which have been recieved
        if (typeof message != 'string' && message.stack && message.message) {
          message = message.stack.split(':')[0]+': '+message.message;
        }
        // Remove current logs if preserve log is turned off
        if (!this.preserve) {
            this.output = [];
        }
        // Add the console log to the console output
        this.output.push({
          level: level,
          message: message
        });
      }
      // Scroll to the bottom of the console output
      this.scroll();
    },
    scroll() {
      const logs = this.$el.children[1].children[1];
      //Wait for the new content to be rendered then adjust the scroll height
      setTimeout(() => logs.scrollTop = logs.scrollHeight, 500);
    }
  }
}