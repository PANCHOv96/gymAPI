export class RoutinesController{
    constructor({RoutineModel}){
        this.model = RoutineModel;
    }

    get = async (req,res) => {
        const props = req.query
        let result;
        if(props.idRoutines){
            result = await this.model.getByRoutinesId(props);
        }else{
            result = await this.model.getAll();
        }
        res.json(result)
    }

    getAllByUserId = async (req,res)=> {
        const { id } = req.params
        const result = await this.model.getAllByUserId({id});
        res.json(result)
    }
    
    postRoutine = async (req,res)=> {
        const {routines_set,name,idUsers,repetitions,idExercises} = req.body;
        const result = await this.model.postRoutine({routines_set,name,idUsers,repetitions,idExercises});
        res.json(result)
    }

    putRoutineById = async (req,res)=> {
        const {id} = req.params;
        const {routines_set,name,idUsers} = req.body;
        const result = await this.model.putRoutineById({routines_set,name,idUsers,id});
        res.json(result)
    }

    // deleteRoutineById = async (req,res)=> {
    //     const {id} = req.params;
    //     const result = await this.model.deleteRoutineById({id});
    //     res.json(result)
    // }
}