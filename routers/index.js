import Auth from './auth.js'

const Router = ( server ) => {
	server.get("/v1", (req, res)=>{
		try{
			res.status(200).json({
				status: "success",
				data: [],
				message:"welcome to api page",
			})
		}catch(error){
				res.status(500).json({
					status: "error",
					message: "Internal Server Error",
				})
		}
	})
	server.use('/v1/auth', Auth)
}



export default Router;