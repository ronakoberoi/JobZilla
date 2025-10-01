import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';

import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconCode,
} from '@tabler/icons-react';

import { content } from '../../Data/PostJob';
import { useEffect } from 'react';

const TextEditor=(props:any) => {
  useEffect(()=>{
    editor?.commands.setContent(props.data);
  }, [props.data])
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Superscript,
      Subscript,
      Link,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content:props.form.getValues().description,
    onUpdate({editor}){
      props.form.setFieldValue('description',editor.getHTML());
    }
  });
  
  const hasStoredMark = (name: string) => {
    try {
      const stored =
      (editor?.state as any)?.storedMarks ?? (editor?.view?.state as any)?.storedMarks;
      if (!stored) return false;
      return !!stored.some((m: any) => m?.type?.name === name);
    } catch {
      return false;
    }
  };

  return (
    <RichTextEditor
    className='mt-2'
      editor={editor}
      styles={{
        content: {
          backgroundColor: '#2E2E2E',
          color: '#ffffff',
        },
        toolbar: {
          backgroundColor: '#2E2E2E',
        },
        control: {
          color: 'white',
          '&[data-active="true"]': {
            backgroundColor: '#27ae60',
            color: '#fff',
          },
          '&:hover': {
            backgroundColor: '#444',
          },
        },
      }}
    >
      <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
        <RichTextEditor.Control
          onClick={() => editor?.chain().focus().toggleBold().run()}
          active={!!editor && (editor.isActive('bold') || hasStoredMark('bold'))}
          aria-label="Bold"
          title="Bold"
        >
          <IconBold size={16} />
        </RichTextEditor.Control>

        <RichTextEditor.Control
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          active={!!editor && (editor.isActive('italic') || hasStoredMark('italic'))}
          aria-label="Italic"
          title="Italic"
        >
          <IconItalic size={16} />
        </RichTextEditor.Control>

        <RichTextEditor.Control
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          active={!!editor && (editor.isActive('underline') || hasStoredMark('underline'))}
          aria-label="Underline"
          title="Underline"
        >
          <IconUnderline size={16} />
        </RichTextEditor.Control>

        <RichTextEditor.Control
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          active={!!editor && (editor.isActive('strike') || hasStoredMark('strike'))}
          aria-label="Strikethrough"
          title="Strikethrough"
        >
          <IconStrikethrough size={16} />
        </RichTextEditor.Control>

        <RichTextEditor.Control
          onClick={() => editor?.chain().focus().toggleCode().run()}
          active={!!editor && (editor.isActive('code') || hasStoredMark('code'))}
          aria-label="Code"
          title="Code"
        >
          <IconCode size={16} />
        </RichTextEditor.Control>
        <RichTextEditor.Highlight />
          <RichTextEditor.H4 />
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export default TextEditor;