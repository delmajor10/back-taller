class CuponController {
    constructor(cuponService) { 
        this.cuponService = cuponService;
    }
    
    getAll = async (req, res) => { 
        const cupons = await this.cuponService.getAllCupons();
        res.status(200).json(cupons);
    }

    getById = async (req, res) => {
        const { id } = req.params;
        const product = await this.cuponService.getCuponById(id);
        res.status(200).json(cupons);
    }

    create = async (req, res) => {
        const product = await this.cuponService.createCupon(req.body);
        res.status(201).json(cupons); // 201 Created! 
    }

    update = async (req, res) => {
        const { id } = req.params;
        const product = await this.cuponService.updateCupon(id, req.body);
        res.status(200).json(cupons);
    }

    delete = async (req, res) => {
        const { id } = req.params;
        await this.cuponService.deleteCupons(id);
        res.status(204).send(); // 204 No Content
    }
}
module.exports = CuponController;