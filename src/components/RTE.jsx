import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

// eslint-disable-next-line react/prop-types
function RTE({label, name, control, defaultValue=""}) {
  return (
    <div>
        {label && <label className="">{label}</label>}
        <Controller
        name={name || "content"}
        control={control}
        render={({field: {onChange}}) => (
            <Editor className="outline-gray-900"
            apiKey='jtp1q21c02oi1nn6jqlzvnhehthm10wvd8zat0gk1qskqmyc'
                initialValue={defaultValue}
                init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'                      
                    }}
                onEditorChange={onChange}
            />
        )}
        /> 
    </div>
  )
}
export default RTE