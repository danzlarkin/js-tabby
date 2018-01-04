export default {
  name: 'application',
  data() {
    return {
      input: '// Write your code here...\nconst message = \'Hello World\';\nconsole.log(message);',
      output: []
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
          }
        }
      }
    }
  },
  methods: {
    execute() {
      try {
        // Execute the code from the input, and parse all console.log to use the log function
        eval(this.input.replace(/console.log\(/g, 'this.log(\'standard\', '));
      } catch (error) {
        // Log any errors to the console
        this.log('error', error);
      }
    },
    log(level, ...messages) {
      for (let message of messages) {
        // Parse any error messages which have been recieved
        if (typeof message != 'string' && message.stack && message.message) {
          message = message.stack.split(':')[0]+': '+message.message;
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