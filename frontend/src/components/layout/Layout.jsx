import MainHeader from "./MainHeader";

function Layout(props) {
  return(
    <div>
      <MainHeader/>
      <main>
        {props.children}
      </main>
    </div>
  )
}

export default Layout;