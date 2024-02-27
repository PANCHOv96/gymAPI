export class UsersController{
    constructor({UserModel}){
        this.model = UserModel;
    }

    getAll = async (req,res) => {
        const props = req.query
        const result = await this.model.getAll(props);
        res.json(result)
    }

    getById = async (req,res)=> {
        const { id } = req.params
        const result = await this.model.getById({id});
        res.json(result)
    }
    
    postUser = async (req,res)=> {
        const {firstname,lastname,email} = req.body;
        const result = await this.model.postUser({firstname,lastname,email});
        res.json(result)
    }

    putUser = async (req,res)=> {
        const {id} = req.params;
        const {firstname,lastname,email} = req.body;
        const result = await this.model.putUser({firstname,lastname,email,id});
        res.json(result)
    }

    putUserStatusById = async (req,res)=> {
        const {id} = req.params;
        const {status} = req.body;
        const result = await this.model.putUser({status,id});
        res.json(result)
    }

    putUserRoleById = async (req,res)=> {
        const {id} = req.params;
        const {roleId} = req.body;
        const result = await this.model.putUser({roleId,id});
        res.json(result)
    }
}