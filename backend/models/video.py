class Video:
    """
    A class to represent a video along with its associated questions.

    Attributes:
        video_id (str): A unique identifier for the video.
        duration (str): The duration of the video as a string (e.g., "00:05:00").
        url (str): The URL to access the video.
        questions (List[Question]): A list of Question objects associated with the video.

    Methods:
        __init__(video_id, duration, url, questions):
            Initializes a new Video instance.
        
        parse_video_mme(video_dict):
            Parses a video dictionary and returns a Video object.
        
        __repr__():
            Returns a JSON representation of the Video object.
        
        toJSON():
            Serializes the Video object to a JSON formatted string.
    """

    video_id: str
    duration: str
    url: str
    questions: List[Question]

    def __init__(self, video_id: str, duration: str, url: str, questions: List[Question]):
        """
        Initializes a new Video instance.

        Args:
            video_id (str): A unique identifier for the video.
            duration (str): The duration of the video as a string.
            url (str): The URL to access the video.
            questions (List[Question]): A list of Question instances associated with the video.
        """
        self.video_id = video_id
        self.duration = duration
        self.url = url
        self.questions = questions

    @staticmethod
    def parse_video_mme(video_dict):
        """
        Parses a video dictionary and returns a Video object.

        This method extracts information from a provided video dictionary, including
        its associated questions, and creates a Video instance.

        Args:
            video_dict (dict): A dictionary containing video details including questions.

        Returns:
            Video: An instance of the Video class.
        """
        return Video(video_id=video_dict["video_id"], duration="?", url=video_dict["url"], questions=Question.parse_video_mme(video_dict["questions"]))

    def __repr__(self):
        """
        Returns a JSON representation of the Video object.

        Returns:
            str: A JSON formatted string representing the Video object.
        """
        # return self.toJSON()
        # return f"Video ID: {self.video_id}, Duration: {self.duration}, URL: {self.url}, # of Questions: {len(self.questions)}"
        return str(self.toJSON())

    def toJSON(self):
        """
        Serializes the Video object to a JSON formatted string.

        Returns:
            str: A JSON formatted string of the Video object.
        """
        # return json.dumps(
        #     self,
        #     default=lambda o: o.__dict__, 
        #     sort_keys=False,
        #     indent=indent)
        return self.__dict__