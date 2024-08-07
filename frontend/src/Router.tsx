import React, { createRef, useState, useMemo, useEffect } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { 
  createBrowserRouter,
  NavLink,
  useLocation,
  useOutlet,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import Welcome from './Pages/Welcome/Welcome'
import Questionaire from './Pages/Questionaire/Questionaire'
import NotFound from './NotFound'
import Finished from './Pages/Finished/Finished'

const routes = [
  { path: '/', name: 'Welcome', element: <Welcome />, nodeRef: createRef() },
  { path: '/questionaire/:id', name: 'Questionaire', element: <Questionaire />, nodeRef: createRef() },
  { path: '/finished', name: 'Finished', element: <Finished />, nodeRef: createRef() },
  { path: '*', name: 'Not Found', element: <NotFound />, nodeRef: createRef() }
]

const Router = () => {
  const { id } = useParams();
  const location = useLocation()
  const currentOutlet = useOutlet()
  const navigate = useNavigate()
  const { nodeRef }: any = routes.find((route) => route.path === location.pathname) ?? {}
  const [ questionId, setQuestionId ] = useState(0);

  const proceed = (() => {
    if (!id) throw "Error"

    navigate(`/questionaire/${parseInt(id) + 1}`)
  })
  
  return (
    <>
      <div className="grid grid-cols-2">
        {/* <button type="button" className="justify-self-start text-2xl flex" onClick={() => navigate(-1)}><IoMdArrowBack className="mt-1 text-2xl" />Back</button> */}
      </div>
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames="animate-fade"
          unmountOnExit
        >
          {(state) => (
            <div ref={nodeRef} className="animate-fade">
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
