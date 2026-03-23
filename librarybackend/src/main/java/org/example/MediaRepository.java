package org.example;

import org.springframework.data.repository.CrudRepository;
import org.example.Media;
import java.util.Optional;

public interface MediaRepository extends CrudRepository<Media, Long> {
    Optional<Media> findByTitleIgnoreCase(String title);
}

