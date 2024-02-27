export class ExercisesController{
    constructor({ExerciseModel}){
        this.model = ExerciseModel;
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
    
    postExercise = async (req,res)=> {
        const {name,description,image,video} = req.body;
        const result = await this.model.postExercise({name,description,image,video});
        res.json(result)
    }

    putExerciseById = async (req,res)=> {
        const {id} = req.params;
        const {routines_set,name,idUsers} = req.body;
        const result = await this.model.putExerciseById({routines_set,name,idUsers,id});
        res.json(result)
    }

    // deleteExerciseById = async (req,res)=> {
    //     const {id} = req.params;
    //     const result = await this.model.deleteExerciseById({id});
    //     res.json(result)
    // }
}