<template>
  <div>
    <v-dialog v-model="dialog" width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          outlined
          fab
          small
          color="red"
          class="ma-2"
          v-bind:class="!hideButton ? 'hidden' : ''"
        >
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
      <v-card color="grey darken-3">
        <v-card-title class="text-h5">
          Reset experience of {{ user.name }}?
        </v-card-title>

        <v-card-text>
          Are you sure you want to reset the experience of {{ user.name }}? This
          action cannot be undone.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="grey" text @click="dialog = false"> Cancel </v-btn>

          <v-btn color="red" :disabled="error" :loading="loading" @click="resetMember()"> Reset </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { deleteRankedMember } from "@/api/api.js";

export default {
  name: "RemoveRankedMemberButton",
  props: {
    guild: Object,
    user: Object,
    hideButton: Boolean,
  },
  data() {
    return {
      dialog: false,
      loading: false,
      error: false,
    };
  },
  watch: {
    dialog: function (dialog) {
        if (!dialog) {
            setTimeout(() => {
                this.loading = false;
                this.error = false;
            }, 500);
        }
    }
  },
  methods: {
    async resetMember() {
      try {
        this.loading = true
        await deleteRankedMember(this.user, this.guild)
        console.log("Emitting member-delete")
        this.$emit('member-delete')
        this.dialog = false
      } catch (err) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
