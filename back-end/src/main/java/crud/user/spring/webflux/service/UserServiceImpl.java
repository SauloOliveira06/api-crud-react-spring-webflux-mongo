package crud.user.spring.webflux.service;

import crud.user.spring.webflux.model.User;
import crud.user.spring.webflux.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.text.ParseException;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean save(User user) throws ParseException {
        user.setId(UUID.randomUUID());
        Disposable subscribe = userRepository.save(user).subscribe();

        return !subscribe.isDisposed();
    }

    @Override
    public Flux<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Mono<Void> delete(UUID uuid) {
        return userRepository.deleteById(uuid);
    }

    @Override
    public Mono<User> getUserById(UUID uuid) {
        return userRepository.findById(uuid);
    }

    @Override
    public Mono<User> updateById(User user) {
        return userRepository.save(user);
    }
}
