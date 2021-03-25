import './App.css'
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
import { LoginPage } from '../LoginPage/LoginPage'
import { Api } from '../../utils/Api'
import React from 'react'
import { Route, Switch, useHistory } from 'react-router'
import { LineChart } from '../LineChart/LineChart'
import dataLine from '../../utils/dataLine.json'
import { CircularChart } from '../CircularChart/CircularChart'

export function App() {
  // Наш линейный график принимает массив из 100 значений (я немного урезал ваш массив до 100 значений, в оригинале он принимал 1000 значений)
  const api = new Api('http://ideadeploy.space/test/login.json') // для авторизации используем моковые данные
  const [loggedIIn, setLoggedIIn] = React.useState(false)
  const [loginError, setLoginError] = React.useState(false) // В зависимости от ответа отдаем клиенту сообщение об ошибке
  const history = useHistory()
  const data = [] // массив чисел
  const categories = [] // массив с датой

  function getDate(value) { // тут мы получаем нужную дату из имеющихся значений в массиве
    const now = new Date(value);
    const month = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июнья",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    const correctDate = `${now.getDate()} ${month[now.getMonth()]}`;
    return correctDate;
  }

  function submitLogin(login, password) { // при входе делаем запрос к апи и проверяем правильность введенных данных 
    api.login(login, password)
      .then(response => {
        if (response.login && response.token) { // делаем небольшую проверку - если все ок редиректим пользователя на главную страницу 
          setLoggedIIn(true)
          setLoginError(false) // В зависимости от ответа отдаем клиенту сообщение об ошибке
          history.push('/')
        } else {
          setLoginError(true) // В зависимости от ответа отдаем клиенту сообщение об ошибке
          return
        }
      })
      .catch(err => {
        setLoginError(true) 
      })
  }

  dataLine.forEach(item => { // на каждой итерации добавляем в массив данные для линейного и кругового графика 
    const date = getDate(item[0])
    categories.push(date) // добавляем в линейный график дату
    data.push(item[1]) // добавляем в линейный график число
  })

  return (
    <section className="app">
      <Switch>
        <Route exact path="/signin">
          <LoginPage request={submitLogin} error={loginError}/>
        </Route>
        <ProtectedRoute loggedIn={loggedIIn} path='/'>
          <h1 className="chartTitle">Линейный график</h1>
          <LineChart data={data} categories={categories} />
          <h2 className="chartTitle">Круговой график</h2>
          <CircularChart series={data}/>
        </ProtectedRoute>
      </Switch>
    </section>
  );
}
