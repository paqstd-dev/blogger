import { RichTextEditor, Link as LinkEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import cn from "classnames";

export function ArticleForm({
  data: { slug, title, description, content } = {},
  onSubmit,
  onDelete,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkEditor,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title,
      description,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((form) =>
        onSubmit({
          ...form,
          content: editor.getHTML(),
        })
      )}
    >
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4">
              <div className="mb-3">
                <label>Заголовок</label>
                <input
                  className={cn("form-control", {
                    "is-invalid": !!errors.title,
                  })}
                  {...register("title", { required: true })}
                />

                {!!errors.title && (
                  <div class="invalid-feedback">Поле обязательно</div>
                )}
              </div>

              <div>
                <label>Описание</label>

                <textarea
                  className={cn("form-control", {
                    "is-invalid": !!errors.description,
                  })}
                  rows={4}
                  {...register("description", { required: true })}
                />
                {!!errors.description && (
                  <div class="invalid-feedback">Поле обязательно</div>
                )}
              </div>
            </div>

            <div className="col-md-8">
              <label>Контент</label>
              <RichTextEditor editor={editor} style={{ minHeight: "60vh" }}>
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
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
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
              </RichTextEditor>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <div className="d-flex justify-content-between">
            <Link to="/blog/articles" className="btn">
              Отмена
            </Link>

            <div className="d-flex gap-2">
              {!!onDelete && (
                <button
                  className="btn btn-danger"
                  onClick={onDelete}
                  type="button"
                >
                  Удалить
                </button>
              )}

              <button className="btn btn-primary" type="submit">
                {!!slug ? "Обновить" : "Опубликовать"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
