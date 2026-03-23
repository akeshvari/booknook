package org.example;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
public class Media {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    private static final String GENERATOR = "MEDIA.generator";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = GENERATOR)
    @SequenceGenerator(name = GENERATOR, sequenceName = "MEDIA_SEQ", allocationSize = 1)
    private Long id;

    protected Media() {

    }

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        Media media = (Media) object;
        return Objects.equals(title, media.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title);
    }

    public Media(String title, String author, String genre, String mediatype, int publicationdate, int rating, String image, String description) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.mediatype = mediatype;
        this.publicationdate = publicationdate;
        this.rating = rating;
        this.image = image;
        this.description = description;
    }

    private String title;
    private String author;
    private String genre;
    private String mediatype;
    private int publicationdate;
    private int rating;
    private String image;
    private String description;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getMediatype() { return mediatype; }
    public void setMediatype(String mediatype) {
        this.mediatype = mediatype;
    }

    public int getPublicationdate() {
        return publicationdate;
    }
    public void setPublicationdate(int publicationdate) {
        this.publicationdate = publicationdate;
    }

    public int getRating() {
        return rating;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

}
