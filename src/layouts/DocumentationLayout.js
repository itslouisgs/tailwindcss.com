import Link from 'next/link'
import { importAll } from '@/utils/importAll'
import { useRouter } from 'next/router'
import { kebabToTitleCase } from '@/utils/kebabToTitleCase'
import { removeOrderPrefix } from '@/utils/removeOrderPrefix'

const pages = {}
importAll(require.context('../pages/docs/?meta=title', true, /\.mdx$/)).forEach(
  ({ fileName, module: { meta } }) => {
    const { groups } = fileName.match(/^\.\/(?<category>[^/]+)\/(?<slug>.*?)\.mdx$/)
    const category = groups.category
    const slug = removeOrderPrefix(groups.slug)
    const title = meta.title || kebabToTitleCase(slug)
    if (pages[category]) {
      pages[category].push({ title, slug })
    } else {
      pages[category] = [{ title, slug }]
    }
  }
)

function NavItem({ href, as, children, isActive }) {
  const linkClassName = 'hover:translate-x-2px hover:text-gray-900 text-gray-600 font-medium'
  const activeLinkClassName = 'text-teal-600 font-medium'

  return (
    <li className="mb-3 lg:mb-1">
      <Link href={href} as={as}>
        <a
          className={`px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block ${
            isActive ? activeLinkClassName : linkClassName
          }`}
        >
          <span
            className={`rounded absolute inset-0 bg-teal-200 ${
              isActive ? 'opacity-25' : 'opacity-0'
            }`}
          />
          <span className="relative">{children}</span>
        </a>
      </Link>
    </li>
  )
}

function Nav({ pages }) {
  const router = useRouter()

  return Object.keys(pages).map((category) => (
    <div className="mb-8" key={category}>
      <h5 className="mb-3 lg:mb-2 text-gray-500 uppercase tracking-wide font-bold text-sm lg:text-xs">
        {kebabToTitleCase(removeOrderPrefix(category))}
      </h5>
      <ul>
        {pages[category].map((item) => (
          <NavItem
            key={item.slug}
            href={`/docs/${category}/${item.slug}`}
            as={`/docs/${item.slug}`}
            isActive={new RegExp(`^\\/docs\\/[^/]+\\/${item.slug}$`).test(router.pathname)}
          >
            {item.title}
          </NavItem>
        ))}
      </ul>
    </div>
  ))
}

export function DocumentationLayout({ children }) {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-6">
      <div className="lg:flex -mx-6">
        <div
          id="sidebar"
          className="hidden fixed inset-0 pt-16 h-full bg-white z-90 w-full border-b -mb-16 lg:-mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block lg:border-0 xl:w-1/5"
        >
          <div
            id="navWrapper"
            className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:top-16 bg-white lg:bg-transparent"
          >
            <div id="navGradient" className="hidden" />
            <nav
              id="nav"
              className="px-6 pt-6 overflow-y-auto text-base lg:text-sm lg:py-12 lg:pl-6 lg:pr-8 sticky?lg:h-(screen-16)"
            >
              <div className="relative -mx-2 w-24 mb-8 lg:hidden">
                <select
                  data-version-switcher
                  className="appearance-none block bg-white pl-2 pr-8 py-1 text-gray-500 font-medium text-base focus:outline-none focus:text-gray-800"
                >
                  <option value="v1">v1.4.6</option>
                  <option value="v0">v0.7.4</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="mb-10">
                <a
                  href="/docs/installation"
                  className="flex items-center px-2 -mx-2 py-1 hover:text-gray-900 font-medium text-gray-900"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      className="text-gray-400 fill-current"
                      d="M12 21a2 2 0 0 1-1.41-.59l-.83-.82A2 2 0 0 0 8.34 19H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a5 5 0 0 1 4 2v16z"
                    />
                    <path
                      className="text-gray-700 fill-current"
                      d="M12 21V5a5 5 0 0 1 4-2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.34a2 2 0 0 0-1.42.59l-.83.82A2 2 0 0 1 12 21z"
                    />
                  </svg>
                  <span className="ml-3">Documentation</span>
                </a>
                <a
                  href="/components"
                  className="mt-3 lg:mt-1 flex items-center px-2 -mx-2 py-1 hover:text-gray-900 font-medium text-gray-600"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      className="text-gray-400 fill-current"
                      d="M3 6l9 4v12l-9-4V6zm14-3v2c0 1.1-2.24 2-5 2s-5-.9-5-2V3c0 1.1 2.24 2 5 2s5-.9 5-2z"
                    />
                    <polygon
                      className="text-gray-700 fill-current"
                      points="21 6 12 10 12 22 21 18"
                    />
                  </svg>
                  <span className="ml-3">Components</span>
                </a>
                <a
                  href="/screencasts"
                  data-external
                  className="mt-3 lg:mt-1 flex items-center px-2 -mx-2 py-1 hover:text-gray-900 font-medium text-gray-600"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      className="text-gray-400 fill-current"
                      d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm0 2v2h2V5H4zm0 4v2h2V9H4zm0 4v2h2v-2H4zm0 4v2h2v-2H4zM18 5v2h2V5h-2zm0 4v2h2V9h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z"
                    />
                    <path
                      className="text-gray-700 fill-current"
                      d="M9 5h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 8h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"
                    />
                  </svg>
                  <span className="ml-3">Screencasts</span>
                </a>
                <a
                  href="https://blog.tailwindcss.com"
                  data-external
                  className="mt-3 lg:mt-1 flex items-center px-2 -mx-2 py-1 hover:text-gray-900 font-medium text-gray-600"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g fillRule="evenodd" clipRule="evenodd">
                      <path
                        fill="#CBD5E0"
                        d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm2 3a1 1 0 00-1 1v4a1 1 0 001 1h3a1 1 0 001-1V7a1 1 0 00-1-1H7z"
                      />
                      <path
                        fill="#4A5568"
                        d="M13 7a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm-7 8a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2zm8-5a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      />
                    </g>
                  </svg>
                  <span className="ml-3">Blog</span>
                </a>
                <a
                  href="/resources"
                  className="mt-3 lg:mt-1 flex items-center px-2 -mx-2 py-1 hover:text-gray-900 font-medium text-gray-600"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      className="text-gray-400 fill-current"
                      d="M9 22c.19-.14.37-.3.54-.46L17.07 14H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9zM4 2h4a2 2 0 0 1 2 2v14a4 4 0 1 1-8 0V4c0-1.1.9-2 2-2zm2 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                    />
                    <path
                      className="text-gray-700 fill-current"
                      d="M11 18.66V7.34l2.07-2.07a2 2 0 0 1 2.83 0l2.83 2.83a2 2 0 0 1 0 2.83L11 18.66z"
                    />
                  </svg>
                  <span className="ml-3">Resources</span>
                </a>
                <a
                  href="/community"
                  className="mt-3 lg:mt-1 flex items-center px-2 -mx-2 py-1 hover:text-gray-900 font-medium text-gray-600"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      className="text-gray-400 fill-current"
                      d="M20.3 12.04l1.01 3a1 1 0 0 1-1.26 1.27l-3.01-1a7 7 0 1 1 3.27-3.27zM11 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                    />
                    <path
                      className="text-gray-700 fill-current"
                      d="M15.88 17.8a7 7 0 0 1-8.92 2.5l-3 1.01a1 1 0 0 1-1.27-1.26l1-3.01A6.97 6.97 0 0 1 5 9.1a9 9 0 0 0 10.88 8.7z"
                    />
                  </svg>
                  <span className="ml-3">Community</span>
                </a>
              </div>
              <Nav pages={pages} />
            </nav>
          </div>
        </div>
        <div
          id="content-wrapper"
          className="min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5 "
        >
          <div id="content">
            <div id="app" className="flex">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
