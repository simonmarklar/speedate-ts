import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

 * {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
 }

 body {
  background: #fff;
  color: rgb(26, 25, 25);
  -webkit-font-smoothing: antialiased;
 }

 body, input, button, table {
  font-size: 1rem;
  font-family: Arial;
 }

 #root {
  margin: 0;
  padding: 0;
  max-width: 100%;
 }

 button {
  cursor: pointer;
 }
`
