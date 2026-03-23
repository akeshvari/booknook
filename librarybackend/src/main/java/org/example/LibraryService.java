package org.example;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class LibraryService {

    public static final int CHANGE_ALL_VALUES = 1;
    public static final int CHANGE_TITLE = 2;
    public static final int CHANGE_AUTHOR = 3;
    public static final int CHANGE_GENRE = 4;
    public static final int CHANGE_MEDIATYPE = 5;
    public static final int CHANGE_PUBLICATIONDATE = 6;
    public static final int CHANGE_RATING = 7;
    public static final int CHANGE_IMAGE = 8;
    public static final int CHANGE_DESCRIPTION = 9;

    private final MediaRepository mediaRepository;

    public LibraryService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    public void mainMenu() {
        Scanner mainMenuScanner = new Scanner(System.in);

        System.out.println("Enter the number of your choice:");
        System.out.println("Add Media (1)");
        System.out.println("Edit Media (2)");
        System.out.println("Show all Media (3)");
        System.out.println("Delete Media (4)");
        System.out.println("Exit (5)");

        while (true) {
            if (mainMenuScanner.hasNextInt()) {
                int menuNumber = mainMenuScanner.nextInt();

                switch (menuNumber) {
                    case 1:
                        System.out.println("Option 1 selected");
                        createMedia();
                        break;
                    case 2:
                        System.out.println("Option 2 selected");
                        editMedia();
                        break;
                    case 3:
                        System.out.println("Option 3 selected");
                        printMedia();
                        exitToMainMenu();
                        break;
                    case 4:
                        System.out.println("Option 4 selected");
                        deleteMedia();
                    case 5:
                        mainMenuScanner.close();
                        System.exit(0);
                    default:
                        System.out.println("Invalid choice. Please enter a valid option.");
                }
            } else {
                System.out.println("Invalid input. Please enter a valid number.");
                mainMenuScanner.nextLine();
            }
        }
    }

    private void createMedia() {

        Media media = new Media();

        int createMediaReturnValue = CHANGE_ALL_VALUES;
        changeValueOfMedia(media, createMediaReturnValue);

        Scanner createMediaScanner = new Scanner(System.in);

        while (true) {

            System.out.println("Enter more Media? (Yes/No)");
            String newMedia = createMediaScanner.nextLine().toLowerCase(Locale.ROOT);

            if (newMedia.equals("yes")) {
                changeValueOfMedia(media, createMediaReturnValue);
                continue;
            }

            if (newMedia.equals("no")) {
                exitToMainMenu();
                break;
            }
            System.out.println("Invalid entry. Please enter 'yes' or 'no'.");
        }
        createMediaScanner.close();
    }

    private void editMedia() {
        Scanner editMediaScan = new Scanner(System.in);

        while (true) {
            printEnterNumberOfMedia();

            if (!editMediaScan.hasNextLong()) {
                System.out.println("Invalid entry. Please enter a number.");
                editMediaScan.next();
                continue;
            }

            long mediaNumber = editMediaScan.nextLong();
            editMediaScan.nextLine();
            exitToMainMenuIfEnter0(String.valueOf(mediaNumber));

            if (mediaNumber == 9) {
                printMedia();
                continue;
            }

            Optional<Media> mediaOptional = this.mediaRepository.findById(mediaNumber);

            if (mediaOptional.isEmpty()) {
                System.out.println("Article number does not exist.");
                continue;
            }

            Media media = mediaOptional.get();
            System.out.println("You selected: " + media.getTitle() + ", Author: " + media.getAuthor() + ", Genre: " + media.getGenre() + ", Media Type: " + media.getMediatype() + ", Publication Date: " + media.getPublicationdate() + ", Rating: " + media.getRating() + ", Image: " + media.getImage() + ", Description: " + media.getDescription());

            System.out.println("Select what you want to edit: everything(1), title(2), author(3), genre(4), mediatype(5) publicationsDate(6), rating(7), image(8), description(9)");

            int editMediaReturnValue;

            while (true) {
                if (editMediaScan.hasNextInt()) {
                    editMediaReturnValue = editMediaScan.nextInt();
                    if (editMediaReturnValue >= 1 && editMediaReturnValue <= 9) {
                        break;
                    }
                }
                System.out.println("Invalid input. Please enter a number between 1 and 9.");
                editMediaScan.nextLine();
            }

            changeValueOfMedia(media, editMediaReturnValue);
            editMediaScan.nextLine();

            while (true) {
                System.out.println("Continue editing? (Yes/No)");
                String navigateMenuInput = editMediaScan.nextLine().toLowerCase(Locale.ROOT);

                if (navigateMenuInput.equals("yes")) {
                    break;
                } else if (navigateMenuInput.equals("no")) {
                    exitToMainMenu();
                    return;
                } else {
                    System.out.println("Invalid entry. Please enter 'yes' or 'no'.");
                }
            }
        }
    }

    private void printMedia() {
        List<Media> mediaList = getMediaList();

        if (!mediaList.isEmpty()) {
            System.out.println("User Input List:");
            for (int i = 0; i < mediaList.size(); i++) {
                Media media = mediaList.get(i);
                System.out.println((media.getId()) + ", Title: " + media.getTitle() + ", Author: " + media.getAuthor() + ", Genre: " + media.getGenre() + ", Media Type: " + media.getMediatype() + ", PublicationDate: " + media.getPublicationdate() + ", Rating: " + media.getRating() + ", Image: " + media.getImage() + ", Description: " + media.getDescription());
            }
        } else {
            System.out.println("The list is empty.");
            exitToMainMenu();
        }
    }

    public List<Media> getMediaList() {
        return (List<Media>) mediaRepository.findAll();
    }

    private void exitToMainMenu() {
        System.out.println("Exit to main menu.");
        mainMenu();
    }

    private void exitToMainMenuIfEnter0(String input) {

        if (input.equals("0")) {
            System.out.println("Process cancelled.");
            exitToMainMenu();
        }
    }

    private void printEnterNumberOfMedia() {
        System.out.println("Please check 'show all media' beforehand (press '5'). \nOr enter the number of the media (Enter (0) to exit):");
    }






    private void deleteMedia() {
        boolean continueDeleting = true;

        while (continueDeleting) {

            System.out.println("Please check 'show all media' beforehand (enter 'show'). \nEnter the numbers of the media you want to delete (if multiple than separate with commas), or enter 0 to cancel:");

            Scanner editMediaScan = new Scanner(System.in);
            String input = editMediaScan.nextLine();

            if (input.equals("show")) {
                printMedia();
                continue;
            }

            exitToMainMenuIfEnter0(input);

            String[] mediaNumbersString = input.split(",");
            List<Long> mediaNumbersList = new ArrayList<>();

            for (String numberString : mediaNumbersString) {
                try {
                    long mediaNumber = Long.parseLong(numberString.trim());
                    mediaNumbersList.add(mediaNumber);
                    Media media = mediaRepository.findById(mediaNumber).orElse(null);

                    if (media != null) {
                        System.out.println(mediaNumber + ": " + media.getTitle());
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Invalid input. Please enter valid numbers separated by commas.");
                    deleteMedia();
                    return;
                }
            }

            for (long mediaNumber : mediaNumbersList) {
                Media mediaToDelete = mediaRepository.findById(mediaNumber).orElse(null);

                if (mediaToDelete == null) {
                    System.out.println("Media " + mediaNumber + " not found.");
                    continue;
                }

                System.out.println("Are you sure you want to delete all these media? (Yes/No)");
                String confirmation = editMediaScan.nextLine().toLowerCase(Locale.ROOT);
                if (!confirmation.equals("yes")) {
                    System.out.println("Deletion process cancelled.");
                    exitToMainMenu();
                    return;
                }

                mediaRepository.delete(mediaToDelete);
                System.out.println("Media " + mediaNumber + " deleted successfully.");
            }

            exitToMainMenu();
            continueDeleting = false;
        }
    }






    private void changeValueOfMedia(Media media, int returnValue) {

        String author;
        String genre;
        String mediatype;
        int publicationdate;
        int rating;
        String image;
        String description;

        Scanner createMediaScan = new Scanner(System.in);

        boolean shouldRunCase1 = false;
        boolean shouldRunCase2 = false;
        boolean shouldRunCase3 = false;
        boolean shouldRunCase4 = false;
        boolean shouldRunCase5 = false;
        boolean shouldRunCase6 = false;
        boolean shouldRunCase7 = false;
        boolean shouldRunCase8 = false;

        while (isInvalidOption(returnValue)) {
            System.out.println("Invalid choice. Please enter a valid option.");
            returnValue = createMediaScan.nextInt();
            createMediaScan.nextLine();
        }

        switch (returnValue) {
            case CHANGE_ALL_VALUES:
                shouldRunCase1 = true;
                shouldRunCase2 = true;
                shouldRunCase3 = true;
                shouldRunCase4 = true;
                shouldRunCase5 = true;
                shouldRunCase6 = true;
                shouldRunCase7 = true;
                shouldRunCase8 = true;
                break;
            case CHANGE_TITLE:
                shouldRunCase1 = true;
                break;
            case CHANGE_AUTHOR:
                shouldRunCase2 = true;
                break;
            case CHANGE_GENRE:
                shouldRunCase3 = true;
                break;
            case CHANGE_MEDIATYPE:
                shouldRunCase4 = true;
                break;
            case CHANGE_PUBLICATIONDATE:
                shouldRunCase5 = true;
                break;
            case CHANGE_RATING:
                shouldRunCase6 = true;
                break;
            case CHANGE_IMAGE:
                shouldRunCase7 = true;
                break;
            case CHANGE_DESCRIPTION:
                shouldRunCase8 = true;
                break;
            default:
                break;
        }

        if (shouldRunCase1) {
            while (true) {
                System.out.println("Enter article title (Enter (0) to exit):");

                String title = createMediaScan.nextLine();
                media.setTitle(title);

                exitToMainMenuIfEnter0(title);

                Optional<Media> foundExistingMedia = mediaRepository.findByTitleIgnoreCase(media.getTitle());

                if (foundExistingMedia.isPresent()) {
                    System.out.println("The Media " + media.getTitle() + " is already used. \nPlease enter a unused title: ");
                } else {
                    break;
                }
            }
        }

        if (shouldRunCase2) {
            try {
                System.out.println("Enter author (Enter (0) to exit):");
                author = createMediaScan.nextLine();
                media.setAuthor(author);
                exitToMainMenuIfEnter0(String.valueOf(author));

            } catch (InputMismatchException exception) {
                author = String.valueOf(0);
                System.out.println("Invalid entry." + createMediaScan.nextLine());
            }
        }

        if (shouldRunCase3) {
            try {
                System.out.println("Enter genre (Enter (0) to exit):");
                genre = createMediaScan.nextLine();
                media.setGenre(genre);
                exitToMainMenuIfEnter0(String.valueOf(genre));

            } catch (InputMismatchException exception) {
                genre = String.valueOf(0);
                System.out.println("Invalid entry." + createMediaScan.nextLine());
            }
        }

        if (shouldRunCase4) {
            try {
                System.out.println("Enter media type (Enter (0) to exit):");
                mediatype = createMediaScan.nextLine();
                media.setGenre(mediatype);
                exitToMainMenuIfEnter0(String.valueOf(mediatype));

            } catch (InputMismatchException exception) {
                mediatype = String.valueOf(0);
                System.out.println("Invalid entry." + createMediaScan.nextLine());
            }
        }

        if (shouldRunCase5) {
            try {
                System.out.println("Enter publication date (Enter (0) to exit):");
                publicationdate = createMediaScan.nextInt();
                media.setPublicationdate(publicationdate);
                exitToMainMenuIfEnter0(String.valueOf(publicationdate));
            } catch (InputMismatchException exception) {
                publicationdate = 0;
                System.out.println("Invalid entry." + createMediaScan.nextInt());
            }
        }

        if (shouldRunCase6) {
            try {
                System.out.println("Enter rating (Enter (0) to exit):");
                rating = createMediaScan.nextInt();
                media.setRating(rating);
                exitToMainMenuIfEnter0(String.valueOf(rating));
            } catch (InputMismatchException exception) {
                rating = 0;
                System.out.println("Invalid entry." + createMediaScan.nextLine());
            }
        }

        if (shouldRunCase7) {
            try {
                System.out.println("Enter image (Enter (0) to exit):");
                image = createMediaScan.nextLine();
                media.setImage(image);
                exitToMainMenuIfEnter0(String.valueOf(image));

            } catch (InputMismatchException exception) {
                image = String.valueOf(0);
                System.out.println("Invalid entry." + createMediaScan.nextLine());
            }
        }

        if (shouldRunCase8) {
            try {
                System.out.println("Enter description (Enter (0) to exit):");
                description = createMediaScan.nextLine();
                media.setDescription(description);
                exitToMainMenuIfEnter0(String.valueOf(description));

            } catch (InputMismatchException exception) {
                description = String.valueOf(0);
                System.out.println("Invalid entry." + createMediaScan.nextLine());
            }
        }

        System.out.println("Media updated successfully.");
        this.mediaRepository.save(media); //könnte in Zukunft zu ungewollten komplikationen führen
    }

    private boolean isInvalidOption(int returnValue) {
        return !(returnValue >= 1 && returnValue <= 4);
    }

    public Media saveMedia(Media media) {
        return mediaRepository.save(media);
    }


    public void deleteMedia(String mediaName) {
        Optional<Media> foundExistingMedia = mediaRepository.findByTitleIgnoreCase(mediaName);
        foundExistingMedia.ifPresent(mediaRepository::delete);
    }

    public Media putMedia(Media media) {

        Optional<Media> foundExistingMedia = mediaRepository.findByTitleIgnoreCase(media.getTitle());
        foundExistingMedia.ifPresentOrElse(existingMedia -> {
            existingMedia.setAuthor(media.getAuthor());
            existingMedia.setGenre(media.getGenre());
            existingMedia.setMediatype(media.getMediatype());
            existingMedia.setPublicationdate(media.getPublicationdate());
            existingMedia.setRating(media.getRating());
            existingMedia.setImage(media.getImage());
            existingMedia.setDescription(media.getDescription());

            mediaRepository.save(existingMedia);
        }, () -> {
            mediaRepository.save(media);
        });

        return media;
    }

}
