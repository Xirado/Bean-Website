<template>
  <div class="vue-terminal"  @click="handleFocus">
    <div class="terminal-header" v-if="showHeader">
      <h4>{{title}}</h4>
      <ul class="shell-dots">
        <li class="shell-dots-red"></li>
        <li class="shell-dots-yellow"></li>
        <li class="shell-dots-green"></li>
      </ul>
    </div>

    <div >
      <div class="terminal-window" ref="terminalWindow">
        <p v-if="greeting">{{greeting}}</p>
        <p v-if="defaultTaskCommandd">
          <span class="prompt"></span><span class="cmd">{{defaultTaskCommandd}}</span>
        </p>

        <p v-for="(item, index) in messageList" :key="index">
          <span>{{item.time}}</span>
          <span v-if="item.label" :class="item.type">{{item.label}}</span>
          <pre class="cmd" v-if="!item.message.list">{{item.message}}</pre>
          <span class="cmd" v-else>
            <pre>{{item.message.text}}</pre>
            <ul>
              <li v-for="(li,index) in item.message.list" :key="index">
                <span v-if="li.label" :class="li.type">{{li.label}}:</span>
                <pre>{{li.message}}</pre>
              </li>
            </ul>
          </span>
        </p>

        <p v-if="actionResult"> <span class="cmd">{{actionResult}}</span></p>

        <p class="terminal-last-line" ref="terminalLastLine">
          <span v-if="lastLineContent==='&nbsp'">
            <span v-if="typeof prompt !== 'undefined'" class="prompt">{{prompt}}</span>
            <span class="prompt" v-else>\{{title}}</span>
          </span>
          <span>{{inputCommand}}</span>
          <span :class="lastLineClass" v-html="lastLineContent"></span>
          <input
            v-model="inputCommand"
            :disabled="lastLineContent!=='&nbsp'"
            :autofocus="autoFocus"
            type="text"
            @keyup="handleCommand($event)"
            ref="inputBox"
            class="input-box">
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'VueTerminal',
    data() {
      return {
        messageList: [],
        actionResult: '',
        lastLineContent: '...',
        inputCommand: '',
        supportingCommandList: '',
        historyIndex: 0,
        commandHistory: []
      };
    },
    props: {
      commandList: {
        required: false,
        default: () => ({})
      },
      taskList: {
        required: false,
        default: () => ({})
      },
      title: {
        required: false,
        type: String,
        default: 'vTerminal'
      },
      showHeader: {
        required: false,
        type: Boolean,
        default: true
      },
      greeting: {
        required: false,
        type: String,
        default: undefined
      },
      defaultTaskCommandd: {
        required: false,
        type: String,
        default: 'init vTerminal'
      },
      defaultTask: {
        required: false,
        type: String,
        default: undefined
      },
      prompt: {
        required: false,
        default: undefined
      },
      showHelpMessage: {
        required: false,
        default: true
      },
      unknownCommandMessage: {
        required: false,
        default: undefined
      },
      autoFocus:{
        required: false,
        default: true
      }
    },
    computed: {
      lastLineClass() {
        if (this.lastLineContent === '&nbsp') {
          return 'cursor'
        } else if (this.lastLineContent === '...') {
          return 'loading'
        }
        return null
      }
    },
    created() {
      this.supportingCommandList = Object.keys(this.commandList).concat(Object.keys(this.taskList))
    },
    async mounted() {
      if (this.defaultTask) {
        await this.handleRun(this.defaultTask)
      }
      if (this.showHelpMessage) {
        this.pushToList({ level: 'System', message: 'Type "help" to get a supporting command list.' })
      }
      this.lastLineContent = '&nbsp'
      if (this.autoFocus){
        this.handleFocus()
      }
    },
    methods: {
      handleFocus() {
        this.$refs.inputBox.focus();
      },
      handleCommand(e) {
        if (e.keyCode !== 13) {
          this.handlekeyEvent(e)
          return
        }
        this.commandHistory.push(this.inputCommand)
        this.historyIndex = this.commandHistory.length
        if (typeof this.prompt !== 'undefined') {
          this.pushToList({ message: `${this.prompt} ${this.inputCommand} ` })
        } else {
          this.pushToList({ message: `$ \\${this.title} ${this.inputCommand} ` })
        }
        if (!this.inputCommand) return;
        const commandArr = this.inputCommand.split(' ')
        if (commandArr[0] === 'help') {
          this.printHelp(commandArr[1])
        } else if (this.commandList[this.inputCommand]) {
          this.commandList[this.inputCommand].messages.map(item => this.pushToList(item))
        } else if (this.taskList[this.inputCommand.split(' ')[0]]) {
          this.handleRun(this.inputCommand.split(' ')[0], this.inputCommand)
        } else {
          if (this.unknownCommandMessage) {
            this.pushToList(this.unknownCommandMessage)
          } else {
            this.pushToList({ level: 'System', message: 'Unknown Command.' })
            this.pushToList({ level: 'System', message: 'type "help" to get a supporting command list.' })
          }
        }
        this.inputCommand = ''
        this.autoScroll()
      },
      handlekeyEvent(e) {
        console.log(e.keyCode)
        switch (e.keyCode) {
          case 38:
            this.historyIndex = this.historyIndex === 0 ? 0 : this.historyIndex - 1
            this.inputCommand = this.commandHistory[this.historyIndex]
            break;
          case 40:
            this.historyIndex = this.historyIndex === this.commandHistory.length ? this.commandHistory.length : this.historyIndex + 1
            this.inputCommand = this.commandHistory[this.historyIndex]
            break;
          default:
            break;
        }
      },
      handleRun(taskName, input) {
        if (!this.taskList[taskName] || !this.taskList[taskName][taskName]) return Promise.resolve()
        this.lastLineContent = '...'
        return this.taskList[taskName][taskName](this.pushToList, input).then(done => {
          this.pushToList(done)
          this.lastLineContent = '&nbsp'
        }).catch(error => {
          this.pushToList(error || { type: 'error', label: 'Error', message: 'Something went wrong!' })
          this.lastLineContent = '&nbsp'
        })
      },
      pushToList(message) {
        this.messageList.push(message)
        this.autoScroll()
      },
      printHelp(input) {
        if (!input) {
          this.pushToList({ message: 'Here is a list of supporting command.' })
          this.supportingCommandList.map(command => {
            if (this.commandList[command]) {
              this.pushToList({ type: 'success', label: command, message: '---> ' + this.commandList[command].description })
            } else {
              this.pushToList({ type: 'success', label: command, message: '---> ' + this.taskList[command].description })
            }
            return undefined
          })
          this.pushToList({ message: 'Enter help <command> to get help for a particular command.' })
        } else {
          const command = this.commandList[input] || this.taskList[input]
          this.pushToList({ message: command.description })
        }
        this.autoScroll()
      },
      time() {
        return new Date().toLocaleTimeString().split('').splice(2).join('')
      },
      autoScroll() {
        this.$nextTick(() => {
          this.$refs.terminalWindow.scrollTop = this.$refs.terminalLastLine.offsetTop;
        })
      }
    }
  };
</script>

<style scoped lang="scss">
.vue-terminal {
  position: relative;
  width: 100%;
  border-radius: 4px;
  color: white;
  margin-bottom: 10px;
  max-height: 580px;
}
.vue-terminal .terminal-window {
  position:absolute;
  top:0;
  left:0;
  right:0;
  overflow:auto;
  z-index:1;
  margin-top:30px;
  max-height:500px;
  padding-top: 50px;
  background-color: rgb(3, 9, 36);
  min-height: 140px;
  padding: 20px;
  font-weight: normal;
  font-family: Monaco, Menlo, Consolas, monospace;
  color: #fff;
  pre {
    font-family: Monaco, Menlo, Consolas, monospace;
    white-space: pre-wrap;
  }
  p {
    overflow-wrap: break-word;
    word-break: break-all;
    font-size: 13px;
    .cmd {
      line-height: 24px;
    }
    .info {
      padding: 2px 3px;
      background: #2980b9;
    }
    .warning {
      padding: 2px 3px;
      background: #f39c12; // https://github.com/Mayccoll/Gogh/blob/master/content/themes.md #Flat
    }
    .success {
      padding: 2px 3px;
      background: #27ae60;
    }
    .error {
      padding: 2px 3px;
      background: #c0392b;
    }
    .system {
      padding: 2px 3px;
      background: #bdc3c7;
    }
  }
  pre {
    display: inline;
  }
}
.terminal-header ul.shell-dots li {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin-left: 6px
}
.terminal-header ul .shell-dots-red {
  background-color: rgb(200, 48, 48);
}
.terminal-header ul .shell-dots-yellow {
  background-color: rgb(247, 219, 96);
}
.terminal-header ul .shell-dots-green {
  background-color: rgb(46, 201, 113);
}
.terminal-header {
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  left: 0;
  background-color: rgb(149, 149, 152);
  text-align: center;
  padding: 2px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px
}
.terminal-header h4 {
  font-size: 14px;
  margin: 5px;
  letter-spacing: 1px;
}
.terminal-header ul.shell-dots {
  position: absolute;
  top: 5px;
  left: 8px;
  padding-left: 0;
  margin: 0;
}
.vue-terminal .terminal-window .prompt::before {
  content: "$";
  margin-right: 10px;
}
.vue-terminal .terminal-window .cursor {
  margin: 0;
  background-color: grey;
  animation: blink 1s step-end infinite;
  -webkit-animation: blink 1s step-end infinite;
  margin-left: 0px;
}
@keyframes blink {
  50% {
    visibility: hidden;
  }
}
@-webkit-keyframes blink {
  50% {
    visibility: hidden;
  }
}
.vue-terminal .terminal-window .loading {
  display: inline-block;
  width: 0;
  overflow: hidden;
  overflow-wrap: normal;
  animation: load 1.2s step-end infinite;
  -webkit-animation: load 1.2s step-end infinite;
}
@keyframes load {
  0% {
    width: 0px;
  }
  20% {
    width: 5px;
  }
  40% {
    width: 10px;
  }
  60% {
    width: 15px;
  }
  80% {
    width: 20px;
  }
}
@-webkit-keyframes load {
  0% {
    width: 0px;
  }
  20% {
    width: 5px;
  }
  40% {
    width: 10px;
  }
  60% {
    width: 15px;
  }
  80% {
    width: 20px;
  }
}
.terminal-last-line {
  font-size: 0;
  word-spacing: 0;
  letter-spacing: 0;
}
.input-box {
  position: relative;
  background:  rgb(3, 9, 36);
  border: none;
  width: 1px;
  opacity: 0;
  cursor: default;
}
.input-box:focus{
  outline: none;
  border: none;
}
</style>