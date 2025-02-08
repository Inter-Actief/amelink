<template>
    <div>
        <Ckeditor :editor="editor" v-model="editorContent" @input="onEditorInput" @ready="onEditorReady"
            :disabled="disabled" />
    </div>
</template>

<script setup lang="ts">
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const editor = ClassicEditor

const props = defineProps<{
    modelValue: string,
    initcontent: string,
    disabled: boolean
}>()

const { modelValue, initcontent, disabled } = props

const editorContent = initcontent

const emit = defineEmits(['update:modelValue'])

const onEditorInput = (event: any) => {
    emit('update:modelValue', event)
}
const onEditorReady = () => {
    // console.log('Editor is ready')
}

</script>

<style>
.ck-editor__editable {
    min-height: 40rem;
}

.ck-body-wrapper {
    opacity: 0;
}
</style>
