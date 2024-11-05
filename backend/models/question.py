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

        