import { useState } from 'react';

export default function SimpleForm(props: {
  button: string;
  inputs: { label: string; placeholder: string; type: string }[];
  onSubmit: any;
}) {
  const defaultStates: any = {};

  props.inputs.forEach(
    (input: { label: string; placeholder: string; type: string }) => {
      defaultStates[input.label] = '';
    }
  );

  const [formStates, setFormStates] = useState(defaultStates);

  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      <form
        className="flex gap-2 flex-col rounded-md shadow-md w-96 w-2/1 p-6 pt-5 bg-slate-50"
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit(formStates);
        }}
      >
        {props.inputs.map((input, i) => {
          return (
            <label key={i}>
              {input.label}
              <input
                className="w-full p-2 focus:outline-none bg-slate-200"
                placeholder={input.placeholder}
                type={input.type}
                value={formStates[input.label]}
                name={input.label}
                onChange={(e: any) => {
                  let newFormStates = Object.assign({}, formStates);

                  newFormStates[e.target.attributes.name.value] =
                    e.target.value;

                  setFormStates(newFormStates);
                }}
              />
            </label>
          );
        })}
        <button
          className="px-4 py-2 mt-3 bg-black text-white text-xl"
          type="submit"
        >
          {props.button}
        </button>
      </form>
    </div>
  );
}
