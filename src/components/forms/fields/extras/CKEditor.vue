<template>
    <div>
        <ckeditor :editor="editor"
                  v-model="editorContent"
                  @input="onEditorInput"
                  @ready="onEditorReady"
                  :disabled="disabled"/>
    </div>
</template>

<script setup lang="ts">
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ckeditor = CKEditor.component;
const editor = ClassicEditor;

const {modelValue, initcontent} = defineProps({
    modelValue: '',
    initcontent: '',
    disabled: Boolean
});

let editorContent = initcontent;

const emit = defineEmits(['update:modelValue']);

const onEditorInput = (event) => {
    emit('update:modelValue', event);
};


</script>


<style>
.ck-editor__editable {
    min-height: 40rem;
}
.ck-body-wrapper {
    opacity: 0;
}
</style>