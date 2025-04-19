import  Auth  from './auth.js'
import { Verify, VerifyRole } from "../middleware/verify.js"


const Router = ( server ) => {
		server.get("/v1/user", Verify, (req, res) => {
			console.log('check')
			res.status(200).json({
				status: "success",
				message: "Welcome to the your Dashboard!",
			});
		});
		
		server.get("/v1/admin", Verify, VerifyRole, (req, res) => {
			res.status(200).json({
				status: "success",
				message: "Welcome to the admin portal"
			})
		})
		

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