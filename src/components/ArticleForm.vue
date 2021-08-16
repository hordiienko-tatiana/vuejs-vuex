<template>
  <div class="editor-page">
    <div class="container">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <mcv-validation-errors v-if="errors" :validation-errors="errors" />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="title"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="What's this article about?"
                  v-model="description"
                />
              </fieldset>

              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
                ></textarea>
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Enter tags"
                  v-model="tagList"
                />
              </fieldset>
              <fieldset class="form-group">
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  :disabled="isSubmitting"
                >
                  Publish Article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import McvValidationErrors from '@/components/AppValidationErrors.vue'

  export default {
    name: 'McvArticleForm',
    components: {
      McvValidationErrors,
    },
    props: {
      initialValues: {
        type: Object,
        required: true,
      },
      errors: {
        type: Object,
        required: false,
      },
      isSubmitting: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        title: this.initialValues.title,
        description: this.initialValues.description,
        body: this.initialValues.body,
        tagList: this.initialValues.tagList.join(' '),
      }
    },
    methods: {
      onSubmit() {
        console.log('emitting onSubmit from article form')
        const form = {
          title: this.title,
          description: this.description,
          body: this.body,
          tagList: this.tagList,
        }
        this.$emit('articleSubmit', form)
      },
    },
  }
</script>
