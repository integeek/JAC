

function Menu1() {

  return (
    <div>
      <div className="space-x-16">
        <div className="items-end flex">
          <div className="text-slate-700 text-4xl font-extrabold leading-tight">
      Welcome to Frontender 🎉
          </div>
          <div className="flex justify-end text-slate-400 font-medium leading-relaxed">
            <div className="border-slate-300 rounded-full px-20 py-12">
        Beta
            </div>
          </div>
        </div>
        <div className="text-slate-600 text-2xl leading-relaxed mt-10">
    With Frontender, you can convert any Figma layer into front-end
    code. Let’s get you set up!
        </div>
        <div className="items-center flex mt-16 text-slate-600 text-xl font-semibold leading-relaxed space-x-6">
          <div className="text-white text-xl font-bold leading-relaxed text-center">
            <div className="items-center bg-indigo-500 rounded-full flex h-10 justify-center w-10">
        1
            </div>
          </div>
          <div>Open the plugin and set your preferred language</div>
        </div>
        <div className="text-slate-500 text-lg leading-relaxed mt-2">
    You can choose between HTML or JSX, and CSS or Tailwind.
        </div>
        <div className="items-center flex mt-12 text-xl leading-relaxed space-x-5">
          <div className="items-center bg-violet-600 rounded-full text-white flex flex-shrink-0 font-bold h-10 justify-center text-center w-10">
      2
          </div>
          <div className="text-slate-600 font-semibold">
      Select a few layers to convert into code
          </div>
        </div>
        <div className="text-slate-500 text-lg leading-relaxed mt-0.5">
    Frontender works best when you select one component at a time,
    like a button or input field. Let’s try it out on the examples
    below!
        </div>
        <div className="text-slate-500 leading-relaxed mt-3">
    Note: make sure to select all layers you want to convert,
    including any children.
        </div>
        <div className="items-start flex mt-14 text-transparent text-xl font-extrabold leading-tighter leading-tight space-x-20">
          <div>
            <div className="items-center bg-white border-neutral-200 rounded-lg shadow-sm flex text-slate-400 text-sm font-medium px-14 py-10">
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7 2.01995e-06C5.284 2.01995e-06 3.592 0.106002 1.93 0.310002C0.806 0.450002 3.722e-09 1.414 3.722e-09 2.517V15.25C-1.26339e-05 15.3769 0.0321572 15.5017 0.0934999 15.6127C0.154843 15.7238 0.243353 15.8174 0.35075 15.885C0.458148 15.9525 0.580922 15.9917 0.707586 15.9989C0.834249 16.0061 0.960663 15.981 1.075 15.926L7 13.082L12.925 15.926C13.0393 15.981 13.1657 16.0061 13.2924 15.9989C13.4191 15.9917 13.5419 15.9525 13.6493 15.885C13.7566 15.8174 13.8452 15.7238 13.9065 15.6127C13.9678 15.5017 14 15.3769 14 15.25V2.517C14 1.414 13.194 0.449002 12.07 0.310002C10.3879 0.103001 8.69475 -0.00052737 7 2.01995e-06Z"
                  fill="#486DCD"
                />
              </svg>

              <div className="text-gray-900 ml-3.5">Bookmark</div>
              <div className="ml-4">12k</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-sky-300 to-fuchsia-400 bg-clip-text">
      A Figma plugin that magically
            <br />
      turns designs into code.
          </div>
        </div>
        <div className="items-center flex mt-12">
          <div className="text-white text-sm font-semibold text-center">
            <div className="bg-gradient-to-l from-purple-600 to-sky-300 rounded-full whitespace-nowrap px-64 py-14">
        Buy now
            </div>
          </div>
          <div className="items-center flex justify-end">
            <div className="items-center bg-zinc-50 border-zinc-50 rounded-lg flex text-slate-400 text-sm font-medium px-12 py-8">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M19 19L13.803 13.803M13.803 13.803C15.2096 12.3964 15.9998 10.4887 15.9998 8.49949C15.9998 6.51029 15.2096 4.60256 13.803 3.19599C12.3964 1.78941 10.4887 0.999207 8.49949 0.999207C6.51029 0.999207 4.60256 1.78941 3.19599 3.19599C1.78941 4.60256 0.999207 6.51029 0.999207 8.49949C0.999207 10.4887 1.78941 12.3964 3.19599 13.803C4.60256 15.2096 6.51029 15.9998 8.49949 15.9998C10.4887 15.9998 12.3964 15.2096 13.803 13.803Z"
                  stroke="#92A4B7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="ml-4">Quick search...</div>
              <div className="ml-24">⌘K</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu1
