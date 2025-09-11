'use client'

const HamburgerMenu = ({ toggleSidebar }) => {
  return (
    <button 
      className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
      onClick={toggleSidebar}
      aria-label="Open menu"
    >
      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
      </svg>
    </button>
  )
}

export default HamburgerMenu