import { ChangeEvent, FormEvent, useState } from "react";

export const Login = () => {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [info, setInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleShow = () => {
    setShow(!show);
  }

  const handleIsLoginChange = () => {
    setIsLogin(!isLogin);
    setInfo({
      name: '',
      email: '',
      password: ''
    })
  }

  const handleChangeInfo = (e: ChangeEvent<HTMLInputElement> ) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo({
      ...info,
      [name]: value
    })
  }

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
  }

  return (
    <div className="h-screen">
      <div className="h-[30%] bg-emerald-500" />

      <div className="h-[70%] bg-gray-200 relative">
        <div className="w-[50%] bg-white px-10 py-5 rounded-md absolute left-[25%] -top-20 shadow-lg">
          <h1 className="text-3xl text-gray-600 text-center mt-5">Whats App</h1>

          <div className="w-full p-10">
            <form onSubmit={submitForm}>
              { !isLogin && 
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    User Name
                  </label>
                  <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="useremail" type="text" placeholder="Username" name="name" required onChange={handleChangeInfo}
                    value={info.name}
                  />
                </div>
              }
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="useremail">
                  User Email
                </label>
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="useremail" type="email" placeholder="Username" name="email" required onChange={handleChangeInfo}
                  value={info.email}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative"> 
                  <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="password" type={show ? 'text' : 'password'} placeholder="Password"  name="password" required onChange={handleChangeInfo}
                    value={info.password}
                  />
                  <button className="absolute top-2 right-3 text-sm text-gray-500"
                    onClick={handleShow} type="button"
                  >
                    { show ? 'hide' : 'show'}
                  </button>
                </div>
              </div>
              <div>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
                  type="submit"
                >
                  { isLogin ? 'Login' : 'Signup'}
                </button>

                <p className="my-2 text-center cursor-pointer" onClick={handleIsLoginChange}>
                  { isLogin ? "Don't have an account?" : "Already have an account?" }
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>

    </div>
  )
}
