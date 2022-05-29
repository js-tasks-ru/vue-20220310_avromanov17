<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isUploading }"
      :style="backgroundImage"
      @click="clearInput"
    >
      <span class="image-uploader__text">{{ labelText }}</span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @change="onChange"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      States,
      isUploading: false,
      isUploadingError: false,
      newImagePreview: '',
      isEmpty: !this.preview,
    };
  },

  computed: {
    state() {
      if (this.isUploading) {
        return States.Uploading;
      } else if (this.backgroundImage && !this.isEmpty) {
        return States.Filled;
      }
      return States.Empty;
    },
    labelText() {
      switch (this.state) {
        case States.Uploading:
          return 'Загрузка...';
        case States.Filled:
          return 'Удалить изображение';
        default:
          return 'Загрузить изображение';
      }
    },
    backgroundImage() {
      let backgroundImage = '';
      if (this.newImagePreview) {
        backgroundImage = `--bg-url: url("${this.newImagePreview}")`;
      } else if (this.preview) {
        backgroundImage = `--bg-url: url('${this.preview}')`;
      }
      return backgroundImage;
    },
  },

  methods: {
    async onChange() {
      this.isUploadingError = false;
      const newFile = this.$refs.input.files[0];
      this.selectFile(newFile);
      if (this.uploader) {
        await this.uploadFile(newFile);
      }
    },
    selectFile(file) {
      this.isEmpty = false;
      this.$emit('select', file);
      this.newImagePreview = URL.createObjectURL(file);
    },
    async uploadFile(file) {
      this.isUploading = true;
      try {
        const uploadResponse = await this.uploader(file);
        this.$emit('upload', uploadResponse);
      } catch (error) {
        this.isUploadingError = true;
        this.clearInput();
        this.$emit('error', error);
      }
      this.isUploading = false;
    },
    clearInput(event) {
      if (this.state === States.Filled || this.isUploadingError) {
        event?.preventDefault();
        this.isEmpty = true;
        this.newImagePreview = '';
        this.$refs.input.value = null;
        this.$emit('remove');
      }
    },
  },
};

const States = Object.freeze({
  Empty: 'Empty',
  Uploading: 'Uploading',
  Filled: 'Filled',
});
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
