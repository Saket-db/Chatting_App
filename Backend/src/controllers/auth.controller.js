export const signup =  (req, res) =>{

    const {fullName, email, password} = req.body
    try{
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }
      
          if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
          }
    } catch(error){

    }
    };

export const login = (req, res) =>{
    res.send("Login Successful");
}

export const logout = (req, res) =>{
    res.send("Logout Successful");
}