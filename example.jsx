function App() {
  const [currentUser, setCurrentUser] = useState("loading");
  useEffect(function() {
    function updateUserInformation() {
      fetch("/username")
        .then(res => res.json)
        .then(user => {
          setCurrentUser(user);
        });
    }
    updateUserInformation();
    const timer = setInterval(updateUserInformation, 30000);
    return () => clearInterval(timer);
  }, []);

  const myAppData = {
    currentUser: currentUser
  };
  return (
    <Context value={myAppData}>
      <Home />
    </Context>
  );
}
