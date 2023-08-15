import React, { useEffect, useState } from "react";
import { Binding, defaultBindings } from "./default_bindings";

const BoxedKey = (p: { children: any }) => (
  <div
    className={[
      "inline-block box-border mr-1 w-fit",
      "border border-neutral-400 rounded px-1 bg-neutral-100"
    ].join(' ')}
  >
    {p.children}
  </div>
);

const Model = (p: { modalKey: Binding, setModalKey: Function, onSave: Function }) => {
  const input = React.createRef<HTMLInputElement>();
  const keys = p.modalKey.keys;
  console.log(p.modalKey);
  const value = [
    keys.ctrl && "Ctrl",
    keys.alt && "Alt",
    keys.command && "Command",
    keys.shift && "Shift",
    keys.code.replace(/Key|Digit|Arrow/, '')
  ]
    .filter(x => x)
    .join(' + ');
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code && /Key|Digit|Arrow/.test(e.code)) {
      p.setModalKey({
        ...p.modalKey,
        keys: {
          alt: e.altKey,
          command: e.metaKey,
          ctrl: e.ctrlKey,
          shift: e.shiftKey,
          code: e.code
        }
      });
    }
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    input.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => p.setModalKey(null)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative flex flex-col w-full max-w-lg p-4 mx-auto bg-white rounded shadow-lg">
          <div className="font-semibold"> Press desired key combination: </div>
          <input
            type="text"
            ref={input}
            value={value}
            onKeyDown={onKeyDown}
            onChange={() => { }}
            className="h-8 border border-neutral-100 outline-sky-700 px-2 rounded-sm text-center"
          ></input>
          <div className="font-semibold mt-2"> Name: </div>
          <input
            type="text"
            className="h-8 border border-neutral-100 outline-sky-700 px-2 rounded-sm"
            value={p.modalKey.name}
            onChange={(e) => p.setModalKey({ ...p.modalKey, name: e.target.value })}
            placeholder="Enter a name for this key binding"
          ></input>
          <div className="font-semibold mt-2"> Template: </div>
          <textarea
            className="h-32 border border-neutral-100 outline-sky-700 px-2 rounded-sm"
            value={p.modalKey.template}
            onChange={(e) => p.setModalKey({ ...p.modalKey, template: e.target.value })}
            placeholder="Paste your template here, use {{text}} as a placeholder for the input text."
          ></textarea>

          <div>
            <button
              disabled={!p.modalKey.name || !p.modalKey.template || !p.modalKey.keys.code}
              className="mt-2 bg-sky-700 text-white rounded-sm px-6 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => p.onSave()}
            >Save</button>
            <button
              className="mt-2 ml-2 border border-neutral-100 rounded-sm px-6 py-1"
              onClick={() => p.setModalKey(null)}
            >Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export const KeyBindings = () => {
  const [modalKey, setModalKey] = useState(null as Binding | null);
  const [modalKeyIndex, setModalKeyIndex] = useState(-1);
  const [keys, setKeys] = useState([] as Binding[]);
  useEffect(() => {
    chrome.storage.local.get(['keys'], (result) => {
      setKeys(result.keys ?? defaultBindings);
    });
  }, []);

  const Icon = (p: { src: string, onClick: Function }) =>
    <div
      className="hidden group-hover:inline-block hover:bg-neutral-300 cursor-pointer w-fit p-1 mx-0 rounded-sm"
      onClick={() => p.onClick()}
    >
      <img src={p.src} className="inline" />
    </div>;

  const onEdit = (key: Binding, idx: number) => {
    setModalKey(key);
    setModalKeyIndex(idx);
  };

  const onRemove = (idx: number) => {
    const newKeys = [...keys];
    newKeys.splice(idx, 1);
    setKeys(newKeys);
    chrome.storage.local.set({ keys: newKeys });
  };

  const onSave = () => {
    const newKeys = [...keys];
    if (modalKeyIndex >= 0) {
      newKeys[modalKeyIndex] = modalKey;
    } else {
      newKeys.push(modalKey);
    }
    setKeys(newKeys);
    chrome.storage.local.set({ keys: newKeys });
    setModalKey(null);
  };

  const onNew = () => {
    setModalKeyIndex(-1);
    setModalKey({
      name: "",
      template: "",
      keys: {
        ctrl: false,
        alt: false,
        command: false,
        shift: false,
        code: ""
      }
    });
  };

  return <div className="p-2">
    <table className="w-full min-h-[300px] select-none">
      <thead className="h-8 bg-neutral-100">
        <tr className="text-left border-b border-gray-300">
          <th className="px-2">Name</th>
          <th className="px-2">Keybinding</th>
          <th className=""></th>
        </tr>
      </thead>
      <tbody>
        {keys.map((key, idx) => {
          return <tr
            key={idx}
            className={"group hover:bg-neutral-200 " + (idx % 2 ? "bg-zinc-100" : "")}
          >
            <td className="h-6 p-2 border-r border-gray-300">{key.name}</td>
            <td className="h-6 px-2 border-r border-gray-300">
              {key.keys.ctrl && <BoxedKey>Ctrl</BoxedKey>}
              {key.keys.alt && <BoxedKey>Alt</BoxedKey>}
              {key.keys.command && <BoxedKey>Command</BoxedKey>}
              {key.keys.shift && <BoxedKey>Shift</BoxedKey>}
              {key.keys.code && <BoxedKey>{key.keys.code.replace(/Key|Digit|Arrow/, '')}</BoxedKey>}
            </td>
            <td className="w-14 text-right pr-1">
              <Icon src="edit.svg" onClick={() => onEdit(key, idx)} />
              <Icon src="chrome-close.svg" onClick={() => onRemove(idx)} />
            </td>
          </tr>
        })}
        <tr></tr>
      </tbody>
    </table>

    <div>
      <button
        className="mt-2 bg-sky-700 text-white rounded-sm px-2 py-1"
        onClick={() => onNew()}
      >Add New Key Binding</button>
    </div>

    {modalKey && <Model
      onSave={onSave}
      modalKey={modalKey}
      setModalKey={setModalKey}
    />}
  </div>;
};
