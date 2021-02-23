package crud.user.spring.webflux.controller;

import crud.user.spring.webflux.model.User;
import crud.user.spring.webflux.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.text.ParseException;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ResponseBody
    @RequestMapping(value="/create", method = RequestMethod.POST)
    public ResponseEntity create(@RequestBody User user) throws ParseException{

        boolean save = userService.save(user);
        return ResponseEntity.ok(save);
    }

    @ResponseBody
    @RequestMapping(value = "/user{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<User> getUserById(@PathVariable("id")UUID uuid){
        return userService.getUserById(uuid);
    }

    @ResponseBody
    @RequestMapping(value = "/user", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public Mono<User> updateById(@RequestBody User user){
        return userService.updateById(user);
    }

    @ResponseBody
    @RequestMapping(value = "/users", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Flux<User> findAll(){
        return userService.findAll();
    }

    @RequestMapping(value = "/delete{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") UUID uuid){
        userService.delete(uuid).subscribe();
    }

}
