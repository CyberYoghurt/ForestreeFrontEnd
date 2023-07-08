<template>
  <div class="contact">
    <h2>Contact Page</h2>
    <div class="contact__chat-containers">
      <chat-view name="Global" user="Global" />
      <chat-view
        v-for="chat in userChats"
        :name="chat.name"
        :user="chat.user"
        :key="chat.name"
      />
    </div>
  </div>
</template>
<script>
import ChatView from '../components/ChatView.vue';
import backEndUrl from '../utils/backEndUrl.js';

export default {
  components: {
    ChatView,
  },
  data() {
    return {
      userChats: [],
    };
  },

  async mounted() {
    const response = await fetch(backEndUrl + 'server/chat-info/', {
      headers: {
        Authorization: 'Bearer ' + String(this.$store.state.accessToken),
      },
    });
    let data = await response.json();

    //First goes the active chat
    if (this.activeChat) {
      const active = data.findIndex((el) => {
        return el.name === this.activeChat;
      });
      const extracted = data.splice(active, 1);
      data = [...extracted, ...data];
    }

    //Naming the chat with the name of the recipient
    if (Array.isArray(data)) {
      data.forEach((element) => {
        let user;
        if (element.users[0].username !== this.user) {
          user = element.users[0].username;
        } else {
          user = element.users[1].username;
        }
        this.userChats.push({
          user,
          name: element.name,
        });
      });
    }
  },
  computed: {
    user() {
      return this.$store.state.username;
    },
    activeChat() {
      return this.$store.state.activeChat;
    },
  },
};
</script>
<style>
.contact {
  margin: 3rem 1rem 0 1rem;
}
</style>
