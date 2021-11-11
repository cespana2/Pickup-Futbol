import NavBar from "./NavBar";

function Layout(props) {
  return (
    <div>
      <NavBar />
      <main>{props.children}</main>
      <footer style={{position: "fixed", bottom: 20, textAlign: "center", width: "100%"}}><p>&copy; Carlos Alberto Espana Jr.</p></footer>
    </div>
  );
}

export default Layout;
