package org.example;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/media")
public class LibraryController {

    private final LibraryService libraryService;

    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping
    public List<MediaDTO> findAllMedia() {

        List<Media> mediaList = libraryService.getMediaList();

        List<MediaDTO> mediaListDTO = new ArrayList<>();

        for (Media media : mediaList) {
            mediaListDTO.add(MediaDTO.from(media));
        }

        return mediaListDTO;
    }

    @PostMapping
    public MediaDTO addMedia(@RequestBody MediaDTO mediaDTO) {
        Media media = MediaDTO.to(mediaDTO);
        Media saveMediaReturnValue = libraryService.saveMedia(media);
        return MediaDTO.from(saveMediaReturnValue);
    }

    @PostMapping("/media2/{test}")
    public void addMedia2(@RequestBody MediaDTO mediaDTO, @PathVariable(name = "test") String testMedia) {
        System.out.println(mediaDTO);
        System.out.println(testMedia);
    }

    @DeleteMapping("/{title}")
    public void deleteMedia(@PathVariable String title) {
        libraryService.deleteMedia(title);
    }

    @PostMapping("/rename")
    public void renameMedia(@RequestBody RenameMediaDTO renameMediaDTO) {
        System.out.println(renameMediaDTO);
    }

    @PutMapping
    public MediaDTO editMedia(@RequestBody MediaDTO mediaDTO) {
        Media media = MediaDTO.to(mediaDTO);
        Media putMediaReturnValue = libraryService.putMedia(media);
        return MediaDTO.from(putMediaReturnValue);
    }

}
