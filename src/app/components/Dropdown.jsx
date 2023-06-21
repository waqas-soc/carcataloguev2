import React from 'react'

const Dropdown = ({title}) => {
  return (
    <>
        <div className="relative inline-block text-left my-2 w-full xs:w-auto">
            <div>
              <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-[0.575rem] py-[0.625rem] px-3 text-sm font-medium text-[0.671rem] text-primary border-[0.77px]  border-secondary" id="menu-button" aria-expanded="true" aria-haspopup="true">
                {title && title}
                <svg className="-mr-1 h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

          </div>
    </>
  )
}

export default Dropdown