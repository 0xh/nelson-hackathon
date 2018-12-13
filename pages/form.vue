<template>
  <div class="container">
    <left-nav/>
    <main>
      <h1>Form</h1>
      <form v-on:submit.prevent="onSubmit">
        <rn-input type="text" label="User Name" name="user" v-model="name" />
        <rn-input type="number" label="Age" name="age" v-model="age" />
        <rn-checkboxes :options="interestOptions" name="interests" label="Interests" v-model="interests" />
        <rn-radios :options="trueFalseOptions" name="enabled" v-model="enabled" />
        <hr />
        <rn-button>Update</rn-button>
      </form>
    </main>
  </div>
</template>

<script>
import LeftNav from '~/components/presentational/LeftNav'

export default {
  components: {
    LeftNav
  },
  data: () => ({
    name: 'Fred',
    age: '21',
    interests: ['g', 'f'],
    enabled: 'true',
    interestOptions: [
      { label: 'Golf', value: 'g' },
      { label: 'Fishing', value: 'f' },
      { label: 'Swimming', value: 's' }
    ],
    trueFalseOptions: [
      { label: 'Login enabled', value: 'true' },
      { label: 'Login disabled', value: 'false' }
    ]
  }),
  methods: {
    onSubmit () {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bedrock/bedrock.scss";

.container {
  margin-top: spacing(4);
  display: flex
}

form > * {
  margin-bottom: spacing(4);
}

</style>
