package pe.edu.upc.demo3798api.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.demo3798api.dtos.AppDTO;
import pe.edu.upc.demo3798api.dtos.CantidadDTO;
import pe.edu.upc.demo3798api.entities.App;
import pe.edu.upc.demo3798api.servicesinterfaces.IAppService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/aplicaciones")
public class AppController {

    @Autowired
    private IAppService aS;

    @GetMapping("/listas")
    public List<AppDTO> listar(){
        return aS.list().stream().map(z->{
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(z, AppDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping("/registra")
    public void insertar(@RequestBody AppDTO dto) {
        ModelMapper m = new ModelMapper();
        App a = m.map(dto, App.class);
        aS.insertar(a);

    }

    @GetMapping("/{id}")
    public AppDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        AppDTO dto=m.map(aS.listId(id), AppDTO.class);
        return dto;
    }

    @PutMapping
    public void modificar(@RequestBody AppDTO dto){
        ModelMapper m = new ModelMapper();
        App a = m.map(dto, App.class);
        aS.update(a);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id){
        aS.delete(id);
    }
    @GetMapping("/cantidades")
    public List<CantidadDTO> consulta01() {
        List<String[]> filaLista = aS.quantityAppByServer();
        List<CantidadDTO> dtoLista = new ArrayList<>();
        for (String[] columna : filaLista) {
            CantidadDTO dto = new CantidadDTO();
            dto.setNameServer(columna[0]);
            dto.setQuantityApp(Integer.parseInt(columna[1]));
            dtoLista.add(dto);
        }
        return dtoLista;
    }
}
