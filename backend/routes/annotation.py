from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from models.db import db

annotation = Blueprint('annotation', __name__)

@annotation.route('/create-task', methods=['POST'])
def create_task():
    task = request.json
    if not task.get('image_url'):
        return jsonify({'message': 'Image URL is required'}), 400
    task_id = db.tasks.insert_one(task).inserted_id
    return jsonify({'message': 'Task created successfully', 'task_id': str(task_id)}), 201

@annotation.route('/get-task', methods=['GET'])
def get_task():
    task = db.tasks.find_one({}, {'_id': 1, 'image_url': 1})
    if task:
        task["_id"] = str(task["_id"])
        return jsonify({'task': task}), 200
    return jsonify({'message': 'No tasks found'}), 404

@annotation.route('/submit-annotation', methods=['POST'])
def submit_annotations():
    annotation_data = request.json
    if not annotation_data.get('task_id') or not annotation_data.get('annotations'):
        return jsonify({'message': 'Task ID and annotations are required'}), 400
    try:
        annotation_data['task_id'] = ObjectId(annotation_data['task_id'])
        db.annotations.insert_one(annotation_data)
        return jsonify({'message': 'Annotation saved successfully'}), 201
    except Exception as e:
        return jsonify({'message': 'Failed to save annotation', 'error': str(e)}), 500