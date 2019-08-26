<template>
  <div id="app">
    <div class="">
      user: <input v-model="user">
      <button @click="connect">Connect</button>
    </div>
    <div class="">
      to: <input v-model="to">
    </div>
    <div class="">
      message: <input v-model="message">
    </div>
    <button @click="sendMessage">Send</button>
    <div>
      <h4>messages:</h4>
      <p v-for="m in receivedMessages">{{ m }}</p>
    </div>
  </div>
</template>

<script>
import ActionCable from 'actioncable'

export default {
  name: 'app',
  data () {
    return {
      user: 0,
      message: '',
      to: '',
      receivedMessages: [],
      messager: null
    }
  },
  methods: {
    connect() {
      const that = this

      const cable = ActionCable.createConsumer(
        `ws://localhost:3000/cable?user=${this.user}`
      )

      that.messager = cable.subscriptions.create('ApplicationCable::MyChannel', {
        received: function(data) {
          const sender = data.sender
          const message = data.message

          that.receivedMessages.push(
            `${sender}: ${message}`
          )
        },
        sendMessage: function() {
          this.perform('send_message', {
            message: that.message,
            to: that.to
          })
        }
      })
    },
    sendMessage() {
      this.messager.sendMessage()
    }
  }
}
</script>
