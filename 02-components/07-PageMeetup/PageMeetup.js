import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from '../06-MeetupView/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: undefined,
      error: undefined,
    };
  },

  watch: {
    async meetupId(newId) {
      this.meetup = undefined;
      this.error = undefined;
      await this.fetchMeetupById(newId);
    },
  },

  mounted: async function () {
    await this.fetchMeetupById(this.meetupId);
  },

  methods: {
    async fetchMeetupById(id) {
      try {
        const newMeetupData = await fetchMeetupById(id);
        this.meetup = newMeetupData;
      } catch (error) {
        this.error = error.message;
      }
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view v-if="meetup" :meetup="meetup"></meetup-view>

      <ui-container v-else-if="!meetup && !error">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else>
        <ui-alert>{{ error }}</ui-alert>
      </ui-container>
    </div>`,
});
