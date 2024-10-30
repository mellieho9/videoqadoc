import json
from typing import List
from fastapi import FastAPI


class Question:
    """
    A class to represent a question.

    Attributes:
        question_id (str): A unique identifier for the question.
        question (str): The text of the question.
        choices (dict[str, str]): A dictionary mapping choice identifiers to choice text.

    Methods:
        __init__(question_id, question, choices):
            Initializes a new Question instance.
            
        _choices_arr_to_dict_video_mme(arr):
            Converts an array of choice strings into a dictionary.
        
        _single_parse_video_mme(question_dict):
            Parses a single question dictionary into a Question object.
        
        parse_video_mme(questions_arr):
            Parses a list of question dictionaries and returns a list of Question objects.
        
        __repr__():
            Returns a JSON representation of the Question object.
        
        toJSON():
            Serializes the Question object to a JSON formatted string.
    """

    question_id: str
    question: str
    choices: dict[str, str]

    def __init__(self, question_id, question, choices):
        """
        Initializes a new Question instance.

        Args:
            question_id (str): A unique identifier for the question.
            question (str): The text of the question.
            choices (dict[str, str]): A dictionary mapping choice identifiers to choice text.
        """
        self.question_id = question_id
        self.question = question
        self.choices = choices

    @staticmethod
    def _choices_arr_to_dict_video_mme(arr: List[str]) -> dict[str, str]:
        """
        Converts an array of choice strings into a dictionary.

        Each choice string is expected to be in the format "identifier. choice_text".

        Args:
            arr (List[str]): A list of choice strings.

        Returns:
            dict[str, str]: A dictionary mapping choice identifiers to choice text.
        """
        result: dict[str, str] = {}
        for item in arr:
            split_str: List[str] = item.split(". ")
            result[split_str[0]] = split_str[1]
        return result

    @staticmethod
    def _single_parse_video_mme(question_dict):
        """
        Parses a single question dictionary into a Question object.

        Args:
            question_dict (dict): A dictionary containing question details.

        Returns:
            Question: An instance of the Question class.
        """
        return Question(question_id=question_dict["question_id"], question=question_dict["question"], choices=Question._choices_arr_to_dict_video_mme(question_dict["choices"]))

    @staticmethod
    def parse_video_mme(questions_arr: List[dict]):
        """
        Parses a list of question dictionaries and returns a list of Question objects.

        Args:
            questions_arr (List[dict]): A list of dictionaries, each containing question details.

        Returns:
            List[Question]: A list of Question instances.
        """
        questions: List[Question] = []
        for question_dict in questions_arr:
            questions.append(Question._single_parse_video_mme(question_dict=question_dict))
        return questions
    
    def __repr__(self):
        """
        Returns a JSON representation of the Question object.

        Returns:
            str: A JSON formatted string representing the Question object.
        """
        return str(self.toJSON())
    
    def toJSON(self):
        """
        Serializes the Question object to a JSON formatted string.

        Returns:
            str: A JSON formatted string of the Question object.
        """
        # return json.dumps(
        #     self,
        #     default=lambda o: o.__dict__, 
        #     sort_keys=False,
        #     indent=2)
        return self.__dict__

        
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

def get_json_data(file_path: str):
    return json.loads(open(file_path, "r", encoding="UTF-8").read())

videos = {}
videos_ids = []
def init_data(videos_input: List[Video], videos_ids_input: List[str]):
    """Initializes data from Video-MME.json"""
    video_mme = get_json_data("Video-MME.json")

    for video in video_mme:
        vid_obj: Video = Video.parse_video_mme(video)
        videos_input[vid_obj.video_id] = vid_obj

    for video_id in videos_input:
        videos_ids_input.append(video_id)

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/video")
def get_video_ids():
    return videos_ids

@app.get("/video/{video_id}")
def get_video(video_id: str):
    return videos[video_id].toJSON()
