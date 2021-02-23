package crud.user.spring.webflux.service;

import crud.user.spring.webflux.model.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.text.ParseException;
import java.util.UUID;

public interface UserService {

    boolean save(User user) throws ParseException;

    Flux<User> findAll();

    Mono<Void> delete(UUID uuid);

    Mono<User> getUserById(UUID uuid);

    Mono<User> updateById(User user);

}
