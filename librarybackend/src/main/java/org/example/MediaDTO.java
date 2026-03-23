package org.example;


public class MediaDTO {

    private String title;
    private String author;
    private String genre;
    private String mediatype;
    private int publicationdate;
    private int rating;
    private String image;
    private String description;

    public MediaDTO(String title, String author, String genre, String mediatype, int publicationdate, int rating, String image, String description) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.mediatype = mediatype;
        this.publicationdate = publicationdate;
        this.rating = rating;
        this.image = image;
        this.description = description;
    }

    public static MediaDTO from(Media media) {
        return new MediaDTO(media.getTitle(), media.getAuthor(), media.getGenre(), media.getMediatype(),  media.getPublicationdate(), media.getRating(), media.getImage(), media.getDescription());
    }

    public static Media to(MediaDTO mediaDTO) {
        return new Media(mediaDTO.getTitle(), mediaDTO.getAuthor(), mediaDTO.getGenre(), mediaDTO.getMediatype(), mediaDTO.getPublicationdate(), mediaDTO.getRating(), mediaDTO.getImage(), mediaDTO.getDescription());
    }

    public String getText() {
        return "text";
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }
    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getMediatype() { return mediatype; }
    public void setMediatype(String mediatype) { this.mediatype = mediatype; }

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
