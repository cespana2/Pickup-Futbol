import NavBar from "./NavBar";

function Layout(props) {
  return (
    <div>
      <NavBar />
      <main>{props.children}</main>
      <footer style={{position: "absolute", bottom: 0, textAlign: "center", width: "100%", marginTop: "-200px"}}><p>&copy; Carlos Alberto Espana Jr.</p></footer>
    </div>
  );
}

export default Layout;
