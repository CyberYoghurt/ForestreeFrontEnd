<template>
  <div class="contact__chat">
    <h3 class="contact__toggle" @click="toggleChat">{{ user }} chat</h3>
    <div class="contact__error" v-if="error">{{ this.error }}</div>
    <transition>
      <div class="contact__window" v-if="isOpened === true">
        <div class="contact__message-container" ref="container">
          <div
            v-for="message in messages"
            :key="message.id"
            class="contact__message-block"
          >
            <div
              class="contact__message"
              :class="{
                'contact__message-own': message.user.username === username,
              }"
            >
              <div class="contact__message-text">
                {{ message.text }}
              </div>
              <div class="contact__message-username">
                {{ message.user.username }}
              </div>
            </div>
          </div>
        </div>
        <div class="contact__send">
          <input
            @keyup.enter="send"
            type="text"
            placeholder="Say hi to the world"
            v-model="activeMessage"
            class="contact__send-box"
          />
          <button class="contact__send-button" @click.prevent="send">
            <svg class="contact__send-svg">
              <use xlink:href="../img/right.svg#right"></use>
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import backEndUrl from '../utils/backEndUrl.js';
export default {
  data() {
    return {
      error: '',
      isOpened: false,
      activeMessage: '',
      messages: [],
      connection: null,
    };
  },
  props: ['name', 'user'],
  methods: {
    toggleChat() {
      if (this.isOpened === false) {
        this.setConnection();
      } else {
        this.connection.close();
      }
      this.isOpened = !this.isOpened;
    },
    send() {
      this.connection.send(JSON.stringify({ message: this.activeMessage }));
      this.activeMessage = '';
      this.error = '';
    },
    setConnection() {
      this.messages = [];
      console.log(backEndUrl.slice(8));
      this.connection = new WebSocket(
        'wss://' +
          backEndUrl.slice(8) +
          'ws/chat/' +
          this.name.toLowerCase() +
          '/' +
          '?token=' +
          this.token
      );
      this.connection.onmessage = (e) => {
        const newData = JSON.parse(e.data);
        if (newData.status === false) {
          this.error = newData.content;
          return;
        }
        if (Array.isArray(newData.content)) {
          newData.content.forEach((message) => {
            this.messages.push(message);
          });
        } else {
          this.messages.push(newData.content);
        }
        if (this.isOpened === true) {
          setTimeout(() => {
            this.$refs.container.scroll(0, this.$refs.container.scrollHeight);
          }, 1000);
        }
      };
      this.connection.onerror = () => {
        this.error = "Can't establish connection";
        this.toggleChat();
      };
    },
  },
  mounted() {
    if (this.$store.state.activeChat === this.name) {
      this.toggleChat();
      this.$store.state.activeChat = null;
    }
  },
  beforeUnmount() {
    if (this.connection) {
      this.connection.close();
    }
  },
  computed: {
    token() {
      return this.$store.state.accessToken;
    },
    username() {
      return this.$store.state.username;
    },
  },
  watch: {
    token() {
      if (this.connection) {
        this.connection.close();
      }
      this.isOpened = false;
    },
  },
};
</script>
<style>
.contact__chat {
  margin: 3rem auto;
}
.contact__message-container {
  overflow: scroll;
  scroll-behavior: smooth;
  height: 300px;
  box-sizing: border-box;
  text-align: left;
}

.contact__message {
  align-self: flex-start;
  text-align: left;
  max-width: 80%;
}
.contact__message-block > .contact__message-own {
  text-align: right;
  align-self: flex-end;
}
.contact__message-username {
  color: rgb(var(--color-8));
  font-size: 14px;
  font-weight: 800;
}
.contact__message-text {
  color: rgb(var(--color-6));
}
.contact__message-text::after {
  display: block;
  content: '';
  height: 1px;
  border-top: dotted rgb(var(--color-8));
  border-bottom: dotted rgb(var(--color-8));
}
.contact__message-block {
  display: flex;
  flex-direction: column;
}
.contact__window {
  background-color: rgb(var(--color-2));
  padding: 1rem;
  border: dotted rgb(var(--color-8));
  border-radius: 1rem;
}
.contact__error {
  color: rgb(var(--color-1));
  background-color: rgb(var(--color-8));
  text-align: center;
  padding: 5px;
  border-radius: 1rem;
  margin: 1rem 0;
}
.contact__chat {
  width: 80%;
}
.contact__send {
  display: flex;
  justify-content: center;
  margin: 2rem auto 0 auto;
  height: 20px;
  border-radius: 5px;
}
.contact__send-box {
  height: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  width: 60vw;
}
.contact__send-button {
  padding: 0;
  background-color: rgb(var(--color-8));
}
.contact__send-svg {
  width: 20px;
  height: 20px;
  fill: rgb(var(--color-1));
}
.contact__toggle {
  background-color: rgb(var(--color-8));
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
  color: rgb(var(--color-2));
  transition: 1s all;
}
.contact__toggle:hover {
  background-color: rgb(var(--color-2));
  color: rgb(var(--color-8));
  border: dashed rgb(var(--color-6));
}
</style>
