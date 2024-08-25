import React, { createRef } from 'react';
import { 
  createBrowserRouter,
  useLocation,
  useOutlet,
} from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import Welcome from './Pages/Welcome/Welcome'
import Questionaire from './Pages/Questionaire/Questionaire'
import NotFound from './NotFound'

const routes = [
  { path: '/', name: 'Welcome', element: <Welcome />, nodeRef: createRef() },
  { path: '/questionaire/:id', name: 'Questionaire', element: <Questionaire />, nodeRef: createRef() },
  { path: '*', name: 'Not Found', element: <NotFound />, nodeRef: createRef() }
]

const Router = () => {
  const location = useLocation()
  const currentOutlet = useOutlet()
  const { nodeRef }: any = routes.find((route) => route.path === location.pathname) ?? {}

  return (
    <>
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames="animate-fade-in"
          unmountOnExit
        >
          {(state) => (
            <div ref={nodeRef} className="animate-fade-in">
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Router />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
])

export default router;
